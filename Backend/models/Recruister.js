import mongoose from "mongoose";
import { Industry } from "../constants/Industry.js";

const recruiterSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyDescription: {
      type: String,
      default: "",
      maxlength: 1000,
      trim: true, // Removes unnecessary spaces
      index: true, // Improves searchability
    },
    companyLocation: {
      type: String,
      default: "",
    },
    contactEmail: {
      type: String,
      default: "",
      trim: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"], // Validates email format
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    companyWebsite: {
      type: String,
      default: "",
      trim: true,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        "Invalid URL format",
      ], // Validates URL format
    },
    industry: {
      type: String,
      index: true,
      enum: [
        Industry.TECHNOLOGY,
        Industry.HEALTHCARE,
        Industry.EDUCATION,
        Industry.FINANCE,
        Industry.RETAIL,
        Industry.OTHER,
      ],
      default: Industry.OTHER,
    },
    jobsPosted: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Recruiter = mongoose.model("Recruiter", recruiterSchema);
export default Recruiter;
