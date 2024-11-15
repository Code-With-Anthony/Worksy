import Job from "../../models/Job.js";
import Candidate from "../../models/Candidate.js";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import { validatePhoneNumber } from "../../utility/validatePhoneNumber.js";
// 1. Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("recruiter", "companyName");
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs", error });
  }
};

// 2. Apply to a specific job
export const applyToJob = async (req, res) => {
  const { jobId } = req.params;
  const candidateId = req.user._id;

  try {
    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job)
      return res
        .status(404)
        .json({ message: "Job not found", data: "Job Not Found" });

    // Check if the candidate has already applied
    const candidate = await Candidate.findById(candidateId);
    if (candidate.appliedJobs.includes(jobId)) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    // Add job to candidate's appliedJobs and save
    candidate.appliedJobs.push(jobId);
    await candidate.save();

    // Increment the applicant count on the job
    job.applicants.push(candidateId);
    await job.save();

    res.status(200).json({ message: "Successfully applied to job" });
  } catch (error) {
    res.status(500).json({ message: "Failed to apply for job", error });
  }
};

// 3. Get jobs the candidate has applied to
export const getAppliedJobs = async (req, res) => {
  const candidateId = req.user._id;

  try {
    // Find the candidate's applied jobs
    const candidate = await Candidate.findById(candidateId).populate(
      "appliedJobs"
    );
    res.status(200).json({ appliedJobs: candidate.appliedJobs });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve applied jobs", error });
  }
};

// 4. Update candidate profile
export const updateProfile = async (req, res) => {
  const userId = req.user._id; // Assuming req.user._id is the authenticated user's ID.
  const {
    name,
    email,
    password,
    personalDetails,
    resumes,
    education,
    skills,
    experience,
    certifications,
    projects,
    totalExperience,
    socialLinks,
  } = req.body;

  try {
    // Find the user document (User schema)
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find the candidate profile (Candidate schema)
    const candidate = await Candidate.findOne({ userId });
    if (!candidate)
      return res.status(404).json({ message: "Candidate profile not found" });

    // Validate phone number if present in personalDetails
    if (personalDetails?.phoneNumber && personalDetails?.country) {
      const validationResult = validatePhoneNumber(
        personalDetails.country,
        personalDetails.phoneNumber
      );

      if (!validationResult.valid) {
        return res.status(400).json({ message: validationResult.message });
      }
    }

    // Update User-level fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      console.log("i came inside");
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Update Candidate-specific fields
    if (personalDetails) {
      candidate.personalDetails = {
        ...candidate.personalDetails,
        ...personalDetails, // Safely merge with existing details
      };
    }
    if (resumes) candidate.resumes = resumes;
    if (education) candidate.education = education;
    if (skills) candidate.skills = skills;
    if (experience) candidate.experience = experience;
    if (certifications) candidate.certifications = certifications;
    if (projects) candidate.projects = projects;
    if (totalExperience !== undefined)
      candidate.totalExperience = totalExperience;
    if (socialLinks) candidate.socialLinks = socialLinks;
    // Save both updated User and Candidate documents
    await user.save();
    await candidate.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update profile", error });
  }
};

//5. Get particular candidate
export const getCandidate = async (req, res) => {
  const { candidateId } = req.body;

  try {
    const candidate = await Candidate.findById(candidateId).populate("userId");
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });

    res.status(200).json({ candidate });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve candidate", error });
  }
};
