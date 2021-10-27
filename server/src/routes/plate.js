import Router from "express";
import {
  createPlate,
  deletePlate,
  getPlateById,
  updatePlate,
} from "../controllers/plate";
import { isAuthenticated } from "../middleware";

const router = Router();

// Get plate by ID
router.get("/:id", getPlateById);

// Create plate
router.post("/", isAuthenticated, createPlate);

// Update plate
router.put("/:id", isAuthenticated, updatePlate);

// Delete plate
router.delete("/:id", isAuthenticated, deletePlate);

export { router as plateRoutes };
