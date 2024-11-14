import mongoose, { mongo } from "mongoose";

const recruiterSchema = mongoose.Schema({
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
  },
  companyDescription: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500,
  },
  companyLocation: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  jobsPosted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

const Recruiter = mongoose.model("Recruiter", recruiterSchema);
export default Recruiter;
