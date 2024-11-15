import mongoose from "mongoose";

const applicationSchema = mongoose.Schema(
  {
    JobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
      index: true,
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
    },
    status: {
      type: String,
      enum: ["applied", "viewed", "interview", "hired", "rejected", "pending"],
      default: "pending",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    coverLetter: {
      type: String,
      maxLength: 2000,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
