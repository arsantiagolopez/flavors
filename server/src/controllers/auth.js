import { Session, TempUser } from "../models";

/**
 * Get token code from tempUser.
 * @method GET.
 * @param {object} req - Http request, including the params.
 * @param {object} res - Http response.
 * @returns a string of the token.
 */
const getTempUserToken = async ({ params }, res) => {
  const { email } = params;
  try {
    const { code } = await TempUser.findOne({ email });
    return res.status(200).json({ success: true, code });
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
 * Create a user session.
 * @method POST.
 * @param {object} req - Http request, including the body and userId
 * @param {object} res - Http response.
 * @returns an object of the created session.
 */
const createSession = async (req, res) => {
  try {
    // const session = to(data);
    // await Session.insertOne(session);
    // return from(session);
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
 * Update a user session.
 * @method PUT.
 * @param {object} req - Http request, including the body and userId
 * @param {object} res - Http response.
 * @returns an object of the created session.
 */
const updateSession = async (req, res) => {
  try {
    let data;

    const { value: session } = await Session.updateOne(
      { sessionToken: data?.sessionToken },
      { $set: data }
    );
    // return from(session);
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
 * Delete a user session.
 * @method DELETE.
 * @param {object} req - Http request, including the body and userId
 * @param {object} res - Http response.
 * @returns an object of the created session.
 */
const deleteSession = async (req, res) => {
  try {
    let sessionToken; //
    const { value: session } = await Session.deleteOne({
      sessionToken,
    });
    // return from(session);
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

export { getTempUserToken, createSession, updateSession, deleteSession };
