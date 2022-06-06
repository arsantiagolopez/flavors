import argon2 from "argon2";
import { Account, Session, TempUser, User, UserProfile } from "../models";
import { validateFields } from "../utils/validateFields";

/**
 * Check if username is available.
 * @method GET.
 * @param {object} req - Http request, including the params.
 * @param {object} res - Http response.
 * @returns true if username available, false if not.
 */
const getUsernameAvailability = async ({ params }, res) => {
  const { username } = params;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(200).json({ success: true, available: false });
    }
    return res.status(200).json({ success: true, available: true });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Something went wrong. Please try again later.",
      },
    });
  }
};

/**
 * Check if email is available.
 * @method GET.
 * @param {object} req - Http request, including the query.
 * @param {object} res - Http response.
 * @returns true if email available, false if not.
 */
const getEmailAvailability = async ({ query }, res) => {
  let { email } = query;
  email = email.toLowerCase();
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(200).json({ success: true, available: false });
    }
    return res.status(200).json({ success: true, available: true });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Something went wrong. Please try again later.",
      },
    });
  }
};

/**
 * Get client-safe accounts & provider information associated with user.
 * @method GET.
 * @param {object} req - Http request, including the userId.
 * @param {object} res - Http response.
 * @returns an array of providers with information.
 */
const getMyAccounts = async ({ userId }, res) => {
  try {
    const data = await Account.find({ userId });
    const accounts = data.map(({ provider }) => provider);
    return res.status(200).json({ success: true, accounts });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Something went wrong. Please try again later.",
      },
    });
  }
};

/**
 * Track amount of codes requested to prevent unathorized API abuse.
 * @method POST.
 * @param {object} req - Http request, including the body.
 * @param {object} res - Http response.
 * @returns a success response.
 */
const trackRequestCodeCount = async ({ body }, res) => {
  const DAY_EMAIL_LIMIT = 5;
  let { email, code } = body;
  email = email.toLowerCase();

  try {
    // Check 1: TempUser exists, code was sent, but full user not created
    // Don't recreate tempUser, update request count
    const tempUser = await TempUser.findOne({ email });

    if (tempUser) {
      // Check 2: Email exceeded the max amount of emails per day. Time out
      let { requestCount, updatedAt } = tempUser;

      const day = 1000 * 60 * 60 * 24;
      // const day = 60 * 1000; // Testing: 1 minute
      const lastEmailSentAt = new Date() - updatedAt;
      const dayPassedAfterLastEmailSent = day < lastEmailSentAt;
      const dailyEmailExceeded =
        requestCount > DAY_EMAIL_LIMIT - 1 && !dayPassedAfterLastEmailSent;

      if (dailyEmailExceeded) {
        // Tell user to try again in 24 hours
        return res.status(200).json({
          success: false,
          error: {
            field: "code",
            message: "You've sent too many emails. Please try again tomorrow.",
          },
        });
      } else if (dayPassedAfterLastEmailSent) {
        // Reset counter and proceed
        requestCount = 0;
      }

      // Update code & request count
      tempUser.code = code;
      tempUser.requestCount = requestCount + 1;
      await tempUser.save();
      return res.status(200).json({ success: true });
    }

    const newTempUser = new TempUser({ email, code });
    await newTempUser.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Something went wrong. Please try again later.",
      },
    });
  }
};

// Resend signup confirmation code to email
const resendCode = (req, res) => {};

/**
 * Create a local user account.
 * @method POST.
 * @param {object} req - Http request, including the body.
 * @param {object} res - Http response.
 * @returns an object with a success response.
 */
const signup = async ({ body }, res) => {
  let { email, firstName, lastName, password, code } = body;
  email = email.toLowerCase();

  try {
    // Make sure input code matches tempUser's code
    const tempUser = await TempUser.findOne({ email });
    const codesMatch = tempUser?.code == code;

    if (!codesMatch) {
      return res.status(200).json({
        success: false,
        error: {
          field: "code",
          message: "Your code doesn't match our records. Please try again.",
        },
      });
    }

    // User should already be created with NextAuth
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        success: false,
        error: {
          field: "code",
          message: "Request a signup code first.",
        },
      });
    }

    // Hash password with argon2
    const hashedPassword = await argon2.hash(password);

    // Update user instance & set email to verified
    user.password = hashedPassword;
    user.emailVerified = new Date();
    await user.save();

    // Update their user profile
    await UserProfile.updateOne(
      { userId: user.id },
      { firstName, lastName, name: `${firstName} ${lastName}` }
    );

    // Delete related tempUser
    await TempUser.deleteOne({ email });

    // Return successfully created user
    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Something went wrong. Please try again later.",
      },
    });
  }
};

/**
 * Authorize user by email & password credentials.
 * @method POST.
 * @param {object} req - Http request, including the body.
 * @param {object} res - Http response.
 * @returns a success boolean response.
 */

// @TODO: What to do with this?
const authorizeCredentials = async ({ body }, res) => {
  // @todo: Adapt to take in any loginId, e.g. username, phone, etc...
  let { password, email } = body;

  try {
    let user = await User.findOne({ email });
    const userId = user.id;

    // No email found, show client safe error message
    if (!user) {
      return res.status(200).json({
        success: false,
        error: {
          field: "credentials",
          message: "Wrong credentials, please try again.",
        },
      });
    }

    // Authenticate password
    const isValid = await argon2.verify(user.password, password);

    if (!isValid) {
      return res.status(200).json({
        success: false,
        error: {
          field: "credentials",
          message: "Wrong credentials, please try again.",
        },
      });
    }

    // Get profile fields & merge with user
    const { name, firstName, lastName } = await UserProfile.findOne({ userId });
    user = { email, name, firstName, lastName };

    // Create & link account to user, if not exists
    const account = await Account.findOne({ userId });

    if (!account) {
      const newAccount = new Account({
        userId,
        provider: "credentials",
        type: "credentials",
      });
      await newAccount.save();
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Something went wrong. Please try again later.",
      },
    });
  }
};

/**
 * Update a local user account.
 * @method PUT.
 * @param {object} req - Http request, including the body and userId.
 * @param {object} res - Http response.
 * @returns a success boolean response.
 */
const updateUser = async ({ body, userId }, res) => {
  let { password, username } = body;

  try {
    // Validate password
    if (password) {
      const { isValid, message } = validateFields({
        field: "password",
        value: password,
      });

      if (!isValid) {
        return res
          .status(200)
          .json({ success: false, error: { field: "password", message } });
      }

      password = await argon2.hash(password);
      body = { ...body, password };
    }

    // Validate username
    if (username) {
      const { isValid, message } = validateFields({
        field: "username",
        value: username,
      });

      if (!isValid) {
        return res
          .status(200)
          .json({ success: false, error: { field: "username", message } });
      }
    }

    await User.findByIdAndUpdate(userId, body);

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Something went wrong. Please try again later.",
      },
    });
  }
};

/**
 * Update user profile.
 * @method PUT.
 * @param {object} req - Http request, including the body and userId
 * @param {object} res - Http response.
 * @returns a profile object with only the recently updated fields.
 */
const updateProfile = async ({ body, userId }, res) => {
  try {
    let { name } = body;

    /**
     * @todo: Limit name change to only twice a month.
     */
    if (name) {
      // Validate name
      const { isValid, message } = validateFields({
        field: "name",
        value: name,
      });

      if (!isValid) {
        return res
          .status(200)
          .json({ success: false, error: { field: "name", message } });
      }

      let [first, ...last] = name.split(" ");

      // Capitalize first letter of every last name
      last = last.map(
        (word) => word[0].toUpperCase() + word.slice(1).toLowerCase()
      );

      // Update fields
      body.firstName = first[0].toUpperCase() + first.slice(1).toLowerCase();
      body.lastName = last.join(" ");
      body.name = `${body.firstName} ${body.lastName}`;
    }

    await UserProfile.updateOne({ userId }, body);
    return res.status(200).json({ success: true, profile: body });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Something went wrong. Please try again later.",
      },
    });
  }
};

/**
 * Update a user's password.
 * @method PUT.
 * @param {object} req - Http request, including the body and userId
 * @param {object} res - Http response.
 * @returns a success boolean response.
 */
const changePassword = async ({ body, userId }, res) => {
  const { oldPassword, newPassword } = body;
  try {
    const user = await User.findOne({ _id: userId });

    // Authenticate password
    const isValid = await argon2.verify(user.password, oldPassword);

    // Check 1: Password must match our records
    if (!isValid) {
      return res.status(200).json({
        success: false,
        error: {
          field: "oldPassword",
          message: "Password doesn't match our records.",
        },
      });
    }

    // Check 2: New password isn't the same as the current one
    if (oldPassword === newPassword) {
      return res.status(200).json({
        success: false,
        error: {
          field: "newPassword",
          message:
            "Your new password can't be your current password. Try a different one.",
        },
      });
    }

    // Proceed to hash & update password
    user.password = await argon2.hash(newPassword);

    // Update & save entity
    await user.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Something went wrong. Please try again later.",
      },
    });
  }
};

/**
 * Delete a local user's account.
 * @method - DELETE.
 * @param {object} req - Http request, including the userId
 * @param {object} res - Http response.
 * @returns a success boolean response.
 */
const deleteUser = async ({ userId }, res) => {
  try {
    await Promise.all([
      Account.deleteMany({ userId }),
      Session.deleteMany({ userId }),
      UserProfile.deleteMany({ userId }),
      User.deleteMany({ _id: userId }),
    ]);

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Something went wrong. Please try again later.",
      },
    });
  }
};

export {
  getUsernameAvailability,
  getEmailAvailability,
  getMyAccounts,
  trackRequestCodeCount,
  resendCode,
  signup,
  authorizeCredentials,
  updateUser,
  updateProfile,
  changePassword,
  deleteUser,
};
