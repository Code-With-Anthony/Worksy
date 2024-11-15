import express from "express";
import {
  getJobApplicants,
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
} from "../controllers/Recruiter/jobController.js";
import {
  authenticateToken,
  isRecruiter,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/jobs", authenticateToken, isRecruiter, getAllJobs);
router.post("/jobs/create", authenticateToken, isRecruiter, createJob);
router.put("/jobs/:jobId", authenticateToken, isRecruiter, updateJob);
router.delete("/jobs/:jobId", authenticateToken, isRecruiter, deleteJob);
router.get(
  "/jobs/:jobId/applicants",
  authenticateToken,
  isRecruiter,
  getJobApplicants
);

export default router;
