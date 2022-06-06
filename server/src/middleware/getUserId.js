import { Session } from "../models";

/**
 * Stores user Id's in the request, if logged in.
 * Continue if not.
 * @param {object} req - Http request.
 * @param {object} res - Http response.
 * @param {object} next - Http next.
 */
const getUserId = async (req, res, next) => {
  const { cookie } = req?.headers;

  // Get everything after "next-auth.session-token="
  let sessionToken = cookie?.split("next-auth.session-token=")[1];

  // Sometimes, other params are passed after token
  if (sessionToken?.includes(";")) {
    sessionToken = sessionToken?.split(";")[0];
  }

  if (!sessionToken) return next();

  try {
    const session = await Session.findOne({ sessionToken });
    if (!session) return next();
    // Store userId in request for further auth in routes
    req.userId = session?.userId;
    return next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Cookie not set.",
      },
    });
  }
};

export { getUserId };
