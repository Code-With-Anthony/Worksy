import Job from "../../models/Job.js";
import Candidate from "../../models/Candidate.js";
import User from "../../models/User.js";

// 1. Get all jobs with "applied" status for the candidate
export const getJobsForCandidate = async (req, res) => {
  try {
    // Retrieve all jobs from the database
    const jobs = await Job.find();

    // Check if the candidate has applied for each job
    const candidateId = req.user._id;
    const candidate = await Candidate.findById(candidateId).populate(
      "appliedJobs"
    );

    // Mark jobs as applied or not
    const jobList = jobs.map((job) => ({
      ...job._doc,
      applied: candidate.appliedJobs.some((appliedJob) =>
        appliedJob._id.equals(job._id)
      ),
    }));

    res.status(200).json({ success: true, data: jobList });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve jobs", error });
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
  const candidateId = req.user._id;
  const {
    name,
    email,
    password,
    resume,
    education,
    skills,
    experience,
    certifications,
    personalDetails,
  } = req.body;

  try {
    // Find the candidate and update details
    const candidate = await User.findById(candidateId);
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });

    // Update candidate fields conditionally
    if (name) candidate.name = name;
    if (email) candidate.email = email;
    if (password) candidate.password = password; // Assume hashing done elsewhere
    if (resume) candidate.resume = resume;
    if (education) candidate.education = education;
    if (skills) candidate.skills = skills;
    if (experience) candidate.experience = experience;
    if (certifications) candidate.certifications = certifications;
    if (personalDetails) candidate.personalDetails = personalDetails;

    await candidate.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error });
  }
};
