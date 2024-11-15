import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  getAllCandidates,
} from "../controllers/Common/userController.js";
import {
  authenticateToken,
  isAdmin,
  isRecruiter,
} from "../middlewares/authMiddleware.js";
import {
  loginUser,
  registerUser,
} from "../controllers/Common/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateToken, getUserProfile);
router.put("/profile", authenticateToken, updateUserProfile);
router.delete("/profile", authenticateToken, deleteUserAccount);
router.get("/candidates", authenticateToken, isRecruiter, getAllCandidates);

export default router;
