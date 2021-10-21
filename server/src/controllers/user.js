import argon2 from "argon2";
import { Account, Session, TempUser, User, UserProfile } from "../models";
import { validateFields } from "../utils/validateFields";

/**
 * Check if username is available.
 * @method - GET.
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
 * Send code to email for confirmation purposes.
 * @method - POST.
 * @param {object} req - Http request, including the body.
 * @param {object} res - Http response.
 * @returns an object with a success response.
 */
const sendSignupCode = async ({ body }, res) => {
  const DAY_EMAIL_LIMIT = 5;
  const { email } = body;
  const lowercaseEmail = email.toLowerCase();

  try {
    const emailExists = await User.findOne({ email: lowercaseEmail });

    // Check 1: User with email already exists
    if (emailExists) {
      return res.status(200).json({
        success: false,
        error: {
          field: "email",
          message: "User with that email already exists.",
        },
      });
    }

    // Check 2: TempUser exists, code was sent, but full user not created
    // Don't recreate tempUser, update code & resend instead

    const tempUserExists = await TempUser.findOne({ email: lowercaseEmail });

    // Generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000);

    if (tempUserExists) {
      // Check 3: Email exceeded the max amount of emails per day. Time out
      let { emailCount, updatedAt } = tempUserExists;

      // const day = 60 * 60 * 24 * 1000;
      const day = 60 * 1000; // Testing: 1 minute
      const lastEmailSentAt = new Date() - updatedAt;
      const dayPassedAfterLastEmailSent = day < lastEmailSentAt;
      const dailyEmailExceeded =
        emailCount > DAY_EMAIL_LIMIT - 1 && !dayPassedAfterLastEmailSent;

      if (dailyEmailExceeded) {
        // Tell user to try again in 24 hours
        return res
          .status(200)
          .json("You've sent too many emails. Please try again tomorrow.");
      } else if (dayPassedAfterLastEmailSent) {
        // Reset counter and proceed
        emailCount = 0;
      }

      // Update tempUser with new code & emailCount
      tempUserExists.code = code;
      tempUserExists.emailCount = emailCount + 1;
      tempUserExists.save();

      // TODO: RESEND EMAIL

      // TODO: Delete after sendEmail implemented TESTING

      console.log("Code: ", code);
      // Return successful response
      return res
        .status(200)
        .json({ success: true, message: "Code succesfully sent." });
    }

    // Check 4: No user or tempUser exists. Send code for the first time
    const tempUser = await new TempUser({
      email: lowercaseEmail,
      code,
    });

    // Save tempUser to db
    tempUser.save();

    // TODO: RESEND EMAIL

    // TODO: Delete after sendEmail implemented TESTING
    console.log("Code: ", code);

    // Return successful response
    return res
      .status(200)
      .json({ success: true, message: "Code succesfully sent." });
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
 * @method - POST.
 * @param {object} req - Http request, including the body.
 * @param {object} res - Http response.
 * @returns an object with a success response.
 */
const signup = async ({ body }, res) => {
  try {
    const { email, code, firstName, lastName, password } = body;
    const lowercaseEmail = email.toLowerCase();
    const emailExists = await User.findOne({ email: lowercaseEmail });

    // Check 1: User with email already exists
    if (emailExists) {
      return res.status(500).json({
        success: false,
        error: {
          field: "email",
          message: "User with that email already exists.",
        },
      });
    }

    // Check 2: Make sure input code matches tempUser's code
    const tempUser = await TempUser.findOne({ email: lowercaseEmail });

    const codesMatch = tempUser.code === code;

    if (!codesMatch) {
      return res
        .status(500)
        .json(
          "Your code doesn't match our records. Please try resending the code, or use a different email."
        );
    }

    // Hash password with argon2
    const hashedPassword = await argon2.hash(password);

    // Create user
    const user = new User({
      email: lowercaseEmail,
      password: hashedPassword,
    });

    // Save user to db
    await user.save();

    // Create their user profile
    const profile = new UserProfile({
      firstName,
      lastName,
      userId: user.id,
    });

    // Save profile to db
    await profile.save();

    // Delete tempUser
    await TempUser.deleteOne({ email: lowercaseEmail });

    // TODO: Why is session not being set on req ?
    // Update user session & log them in
    // req.session.userId = user.id;

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
 * Update a local user account.
 * @method - PUT.
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
 * @method - PUT.
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
 * @method - PUT.
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
  sendSignupCode,
  resendCode,
  signup,
  updateUser,
  updateProfile,
  changePassword,
  deleteUser,
};
