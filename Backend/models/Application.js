import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
  JobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true,
  },
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
    required: true,
  },
  status: {
    type: String,
    enum: ["applied", "viewed", "interview", "hired", "rejected"],
    default: "Pending",
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  coverLetter: {
    type: String,
  },
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
