import Router from "express";
import {
  changePassword,
  deleteUser,
  getUsernameAvailability,
  sendSignupCode,
  signup,
  updateProfile,
  updateUser,
} from "../controllers/user";
import { isAuthenticated } from "../middleware";

const router = Router();

// Check if username is available
router.get("/username/:username", getUsernameAvailability);

// Send a code for email sign up
router.post("/send-code", sendSignupCode);

// Create user account and sign up
router.post("/signup", signup);

// Update user account
router.put("/", isAuthenticated, updateUser);

// Update user profile
router.put("/profile", isAuthenticated, updateProfile);

// Update user's password
router.put("/change-password", isAuthenticated, changePassword);

// Delete user's account
router.delete("/delete", isAuthenticated, deleteUser);

export { router as userRoutes };
