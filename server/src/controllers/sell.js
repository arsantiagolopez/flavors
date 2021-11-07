import { Schedule } from "../models/Schedule";


/**
 * Get my schedule.
 * @method - GET.
 * @param {req} req - Http request, including the userId.
 * @param {res} res - Http response.
 * @returns an object of your current schedule.
 */
const getMySchedule = async ({ userId }, res) => {
  try {
    const schedule = await Schedule.findOne({ userId });
    return res.status(200).json({ success: true, schedule });
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
 * Update my schedule.
 * @method - PUT.
 * @param {req} req - Http request, including the userId & body.
 * @param {res} res - Http response.
 * @returns an object of the recently updated schedule.
 */
const updateMySchedule = async ({ userId, body }, res) => {
  try {
    // Update if exists, create if it doesn't
    const updatedSchedule = await Schedule.updateOne({ userId }, body, {
      upsert: true,
    });
    return res.status(200).json({ success: true, schedule: updatedSchedule });
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

export { getMySchedule, updateMySchedule };
