import mongoose from "mongoose";
const candidateSchmea = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resumes: [String],
  skills: [String],
  experience: [
    {
      company: String,
      role: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
      startDate: Date,
      endDate: Date,
    },
  ],
});

const Candidate = mongoose.model("Candidate", candidateSchmea);
export default Candidate;
