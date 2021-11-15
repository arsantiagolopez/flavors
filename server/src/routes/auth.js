import Router from "express";
import {
  createSession,
  deleteSession,
  getTempUserToken,
  updateSession,
} from "../controllers/auth";

const router = Router();

// Get token stored from tempUser

// @TODO: Change to POST request as email is sensitive info
router.get("/token/:email", getTempUserToken);

// Create a user session
router.post("/session", createSession);

// Update a user session
router.put("/session/:token", updateSession);

// Delete a user session
router.delete("/session/:token", deleteSession);

export { router as authRoutes };
