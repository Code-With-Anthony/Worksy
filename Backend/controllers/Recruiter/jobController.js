import Job from "../../models/Job.js";
import Recruiter from "../../models/Recruister.js";

// create a new job
export const createJob = async (req, res, next) => {
  const { title, description, location, salaryRange, skillsRequired, type } =
    req.body;
  const recruiterId = req.user._id;

  if (
    !title ||
    !description ||
    !location ||
    !salaryRange ||
    !skillsRequired ||
    !type
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    //verify recruiter
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found." });
    }

    // Create a new job
    const newJob = new Job({
      title,
      description,
      location,
      salaryRange,
      skillsRequired,
      company: recruiterId,
      type,
    });

    await newJob.save();

    // Add job reference to recruiter
    recruiter.jobsPosted.push(newJob._id);
    await recruiter.save();

    res.status(201).json({
      success: true,
      data: newJob,
      messae: "Created New Job Successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//get all jobs
export const getAllJobs = async (req, res, next) => {
  // try {
  //   const jobs = await Job.find().populate("company", "companyName");
  //   res.status(200).json({
  //     success: true,
  //     data: jobs,
  //     message: "Fetched All Jobs Successfully",
  //   });
  // } catch (err) {
  //   return res.status(500).json({ message: err.message });
  // }
  const recruiterId = req.user._id;

  try {
    const jobs = await Job.find({ company: recruiterId });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve jobs", error });
  }
};

//get job by id
export const getJobById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id).populate("company", "companyName");
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }
    res
      .status(200)
      .json({ success: true, data: job, message: "Job Found Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//update job by id
export const updateJob = async (req, res) => {
  // const { id } = req.params;
  // const recruiterId = req.user._id;
  // const { title, description, location, salaryRange, skillsRequired, type } =
  //   req.body;

  // try {
  //   const updatedJob = await Job.findByIdAndUpdate(
  //     id,
  //     { title, description, location, salaryRange, skillsRequired, type },
  //     { new: true }
  //   );
  //   if (!updatedJob) {
  //     return res.status(404).json({ message: "Job not found" });
  //   }
  //   res.status(200).json({
  //     success: true,
  //     data: updatedJob,
  //     message: "Job Updated Successfully",
  //   });
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
  const { jobId } = req.params;
  const recruiterId = req.user._id;
  const updates = req.body;

  try {
    const job = await Job.findOne({ _id: jobId, recruiter: recruiterId });
    if (!job)
      return res.status(404).json({ message: "Job not found or unauthorized" });

    Object.keys(updates).forEach((key) => {
      job[key] = updates[key];
    });

    await job.save();
    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Failed to update job", error });
  }
};

//delete job by id
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const recruiterId = req.user._id;

  // try {
  //   const deletedJob = await Job.findByIdAndDelete(id);
  //   if (!deletedJob) {
  //     return res.status(404).json({ message: "Job not found" });
  //   }
  //   res.status(200).json({
  //     success: true,
  //     data: deletedJob,
  //     message: "Job deleted successfully",
  //   });
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
  try {
    const job = await Job.findOneAndDelete({
      _id: jobId,
      recruiter: recruiterId,
    });
    if (!job)
      return res.status(404).json({ message: "Job not found or unauthorized" });

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete job", error });
  }
};

//get applicants for specific job
export const getJobApplicants = async (req, res) => {
  const { id } = req.params;
  const recruiterId = req.user._id;

  try {
    const job = await Job.findOne({
      _id: id,
      recruiter: recruiterId,
    }).populate("applicants");
    if (!job)
      return res.status(404).json({ message: "Job not found or unauthorized" });

    const applicants = await Candidate.find({ _id: { $in: job.applicants } });

    res.status(200).json({ applicants });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve applicants", error });
  }
};
