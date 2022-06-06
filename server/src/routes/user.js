import Router from "express";
import {
  authorizeCredentials,
  changePassword,
  deleteUser,
  getEmailAvailability,
  getMyAccounts,
  getUsernameAvailability,
  signup,
  trackRequestCodeCount,
  updateProfile,
  updateUser,
} from "../controllers/user";
import { isAuthenticated } from "../middleware";

const router = Router();

// Check if username is available
router.get("/username/:username", getUsernameAvailability);

router.get("/email", getEmailAvailability);

// Get all accounts and providers associated to user
router.get("/accounts", getMyAccounts);

// Track code requests & email limitations
router.post("/code", trackRequestCodeCount);

// Create user account and sign up
router.post("/signup", signup);

// Authorize user credentials
router.post("/authorize", authorizeCredentials);

// Update user account
router.put("/", isAuthenticated, updateUser);

// Update user profile
router.put("/profile", isAuthenticated, updateProfile);

// Update user's password
router.put("/change-password", isAuthenticated, changePassword);

// Delete user's account
router.delete("/delete", isAuthenticated, deleteUser);

export { router as userRoutes };
