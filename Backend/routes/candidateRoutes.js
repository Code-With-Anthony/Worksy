import express from "express";
import {
  getJobsForCandidate,
  applyToJob,
  getAppliedJobs,
  updateProfile,
} from "../controllers/Candidate/candidateController.js";
import { isCandidate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/jobs", isCandidate, getJobsForCandidate);
router.post("/jobs/:jobId/apply", isCandidate, applyToJob);
router.get("/applied-jobs", isCandidate, getAppliedJobs);
router.put("/profile", isCandidate, updateProfile);

export default router;
