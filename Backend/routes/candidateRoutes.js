import express from "express";
import {
  getAllJobs,
  applyToJob,
  getAppliedJobs,
  updateProfile,
  getCandidate,
} from "../controllers/Candidate/candidateController.js";
import {
  authenticateToken,
  isCandidate,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/jobs", authenticateToken, isCandidate, getAllJobs); //candidates can see all the jobs posted in the platform regardless applied or not
router.post("/jobs/:jobId/apply", authenticateToken, isCandidate, applyToJob); //candidates can apply to specific job
router.get("/applied-jobs", authenticateToken, isCandidate, getAppliedJobs); //candiadte can see all its applied jobs
router.post("/profile", authenticateToken, isCandidate, getCandidate); //gets the user profile (done)
router.put("/profile/update", authenticateToken, isCandidate, updateProfile); //candidate can manage its profile (done)
export default router;
