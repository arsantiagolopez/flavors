import { Plate } from "../models/Plate";

/**
 * Get all my created plates & insights.
 * @method GET.
 * @param {req} req - Http request, including the userId.
 * @param {res} res - Http response.
 * @returns an object of your current schedule.
 */
const getMyPlates = async ({ userId }, res) => {
  try {
    const plates = await Plate.find({ userId }).lean().exec();
    return res.status(200).json({ success: true, plates });
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
 * Get a plate by ID.
 * @method GET.
 * @param {req} req - Http request, including params and userId.
 * @param {res} res - Http response.
 * @returns an object of the plate.
 */
const getPlateById = async ({ params, userId }, res) => {
  const { id } = params;
  try {
    const plate = await Plate.findById(id).lean().exec();

    if (!plate) {
      return res.status(200).json({
        success: false,
        error: {
          field: "server",
          message: "Plate no longer exists.",
        },
      });
    }

    const { insights, ...publicProps } = plate;

    const isSeller = userId === plate?.userId;

    // @todo: Update view count if viewer isn't the creator

    return res
      .status(200)
      .json({ success: true, plate: isSeller ? plate : publicProps });
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
 * Create a plate plate to sell.
 * @method POST.
 * @param {req} req - Http request, including the body and userId.
 * @param {res} res - Http response.
 * @returns an object of the recently created plate.
 */
const createPlate = async ({ body, userId }, res) => {
  try {
    const plate = new Plate({ ...body, userId });
    // Save plate to db
    await plate.save();
    return res.status(200).json({ success: true, plate });
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
 * Update a plate document.
 * @method PUT.
 * @param {req} req - Http request.
 * @param {res} res - Http response.
 * @returns an object of the recently updated plate.
 */
const updatePlate = async (req, res) => {
  try {
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
 * Delete a plate instance.
 * @method DELETE.
 * @param {req} req - Http request.
 * @param {res} res - Http response.
 * @returns a success boolean.
 */
const deletePlate = async (req, res) => {
  try {
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

export { getMyPlates, getPlateById, createPlate, updatePlate, deletePlate };
