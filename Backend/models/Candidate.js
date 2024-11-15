import mongoose from "mongoose";
import { Gender } from "../constants/Gender.js";
import { MaritalStatus } from "../constants/MaritalStatus.js";
const candidateSchmea = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    personalDetails: {
      address: {
        street: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        zipCode: { type: String, default: "" },
      },
      age: {
        type: Number,
        min: 18,
        max: 99,
        default: 18,
      },
      gender: {
        type: String,
        enum: [Gender.FEMALE, Gender.MALE, Gender.OTHER],
        default: Gender.OTHER,
      },
      maritalStatus: {
        type: String,
        enum: [
          MaritalStatus.MARRIED,
          MaritalStatus.DIVORCED,
          MaritalStatus.SEPARATED,
          MaritalStatus.SINGLE,
          MaritalStatus.WIDOWED,
        ],
        default: MaritalStatus.SINGLE,
      },
      country: {
        type: String,
        default: "INDIA",
      },
      phoneNumber: {
        type: String,
        default: null,
      },
      image: {
        type: String,
        default: "/images/default_profile.png",
      },
      hobbies: {
        type: [String],
      },
      bio: {
        type: String,
        maxlength: 1000,
        default:
          "Your bio is your personal space! Tell us about your interests, your dreams, and what makes you excited to be here.",
      },
    },
    resumes: {
      type: [String],
      validate: {
        validator: function (val) {
          return val.every((file) => /\.(pdf|docx)$/.test(file));
        },
        message: "Resume files must be in .pdf or .docx format",
      },
    },
    skills: {
      type: [String],
      maxlength: 1000,
      default: "",
    },
    totalExperience: {
      type: Number,
      min: 0,
      default: 0,
    },
    experience: [
      {
        company: { type: String },
        role: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        field_of_study: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
    certifications: [
      {
        title: { type: String },
        issuingOrganization: { type: String },
        year: { type: Date },
        certificationUrl: { type: String },
      },
    ],
    projects: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        technologies: {
          type: [String],
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        role: {
          type: String,
        },
        url: {
          type: String,
          validate: {
            validator: function (v) {
              return /^https?:\/\/[^\s]+$/.test(v);
            },
            message: "Invalid URL format",
          },
        },
        features: {
          type: [String],
        },
      },
    ],
    appliedJobs: [
      {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
        appliedDate: { type: Date, default: Date.now },
      },
    ],
    socialLinks: [
      {
        name: { type: String },
        url: {
          type: String,
          validate: {
            validator: function (v) {
              return /^https?:\/\/[^\s]+$/.test(v);
            },
            message: "Invalid URL format",
          },
        },
      },
    ],
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 3;
}

const Candidate = mongoose.model("Candidate", candidateSchmea);
export default Candidate;
