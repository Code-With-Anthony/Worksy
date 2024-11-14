import express from "express";
import {
  registerUser,
  loginUser,
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

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateToken, getUserProfile);
router.put("/profile", authenticateToken, updateUserProfile);
router.delete("/profile", authenticateToken, deleteUserAccount);
router.get("/candidates", authenticateToken, isRecruiter, getAllCandidates);

export default router;
