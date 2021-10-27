import { Plate } from "../models/Plate";

/**
 * Get a plate by ID.
 * @method - GET.
 * @param {req} req - Http request, including params.
 * @param {res} res - Http response.
 * @returns an object of the plate.
 */
const getPlateById = async ({ params }, res) => {
  const { id } = params;
  try {
    const plate = await Plate.findById(id);
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
 * Create a plate plate to sell.
 * @method - POST.
 * @param {req} req - Http request, including the body and userId.
 * @param {res} res - Http response.
 * @returns an object of the recently created plate.
 */
const createPlate = async ({ body, userId }, res) => {
  try {
    const plate = new Plate({ ...body, userId });
    // Save user to db
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
 * @method - PUT.
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
 * @method - DELETE.
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

export { createPlate, deletePlate, getPlateById, updatePlate };
