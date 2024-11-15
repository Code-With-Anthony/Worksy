import mongoose from "mongoose";
import { Industry } from "../constants/Industry.js";

const recruiterSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
      index: true,
      trim: true, // Removes unnecessary spaces
    },
    companyDescription: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
      trim: true, // Removes unnecessary spaces
      index: true, // Improves searchability
    },
    companyLocation: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"], // Validates email format
    },
    phoneNumber: {
      type: String,
      // required: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"], // Validates phone format
    },
    companyWebsite: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        "Invalid URL format",
      ], // Validates URL format
    },
    industry: {
      type: String,
      required: true,
      index: true,
      enum: [
        Industry.TECHNOLOGY,
        Industry.HEALTHCARE,
        Industry.EDUCATION,
        Industry.FINANCE,
        Industry.RETAIL,
        Industry.OTHER,
      ],
      default: "Other",
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
