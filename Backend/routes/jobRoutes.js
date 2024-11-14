import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "../controllers/Recruiter/jobController.js";
import {
  authenticateToken,
  isRecruiter,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

//create job
router.post("/create", authenticateToken, isRecruiter, createJob);

//get all job
router.get("/", authenticateToken, getAllJobs);

//get job by id
router.get("/:id", authenticateToken, getJobById);

//update job by id
router.put("/:id", authenticateToken, isRecruiter, updateJob);

//delete job by id
router.delete("/:id", authenticateToken, isRecruiter, deleteJob);

export default router;
