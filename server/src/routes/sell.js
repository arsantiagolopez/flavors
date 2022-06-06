import Router from "express";
import { getMySchedule, updateMySchedule } from "../controllers/sell";
import { isAuthenticated } from "../middleware";

const router = Router();

// Get my schedule
router.get("/schedule", isAuthenticated, getMySchedule);

// Update my schedule
router.put("/:id", isAuthenticated, updateMySchedule);

export { router as sellRoutes };
