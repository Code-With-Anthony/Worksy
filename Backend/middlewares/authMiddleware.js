import jwt from "jsonwebtoken";
import { Roles } from "../constants/Roles.js";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

//middleware to verify the JWT token present the the request headers
export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (!authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  //if the token is valid, verify it to get the payload from it
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // check if user exists in the database
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(403).json({ message: "User not authorized" });
    }

    //if all goes well -  sets the payload(decoded) in the request object
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

//middleware to verify admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== Roles.ADMIN) {
    return res.status(403).json({ message: "User not authorized" });
  }
  next();
};

//middleware to verify recruiter
export const isRecruiter = (req, res, next) => {
  if (req.user.role !== Roles.RECRUITER) {
    return res.status(403).json({ message: "User not authorized" });
  }
  next();
};

export const isCandidate = (req, res, next) => {
  if (req.user.role !== Roles.CANDIDATE) {
    return res.status(403).json({ message: "User not authorized" });
  }
  next();
};
