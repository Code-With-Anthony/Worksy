import express from "express";
import {
  loginUser,
  registerUser,
  updatedPassword,
} from "../controllers/Common/authController.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/changePass").post(updatedPassword);

export default router;
