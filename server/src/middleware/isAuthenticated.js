/**
 * Prevent unauthorized users from accessing protected routes.
 * @param {object} req - Http request.
 * @param {object} res - Http response.
 * @param {object} next - Http next.
 */
const isAuthenticated = async ({ userId }, res, next) => {
  try {
    /**
     * @todo: Confirm if status 200 is what we want to send non-authenticated
     * users trying to access a private route.
     */

    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "You must be authenticated to access this route.",
      });
    }

    // Continue
    next();
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

export { isAuthenticated };
