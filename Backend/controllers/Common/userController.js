import User from "../../models/User.js";
import { Roles } from "../../constants/Roles.js";
import Candidate from "../../models/Candidate.js";
import { validatePhoneNumber } from "../../utility/validatePhoneNumber.js";

//get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne(req.user._id).select("-password");

    //if no user found then
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the user is a candidate, fetch candidate-specific details
    if (user.role === "candidate") {
      const candidateProfile = await Candidate.findOne({ userId: user._id });
      res.status(200).json({ success: true, data: candidateProfile });
    } else {
      res.status(200).json({ success: true, data: user });
    }
  } catch (err) {
    res.status(404).json({ message: "Failed to get profile", data: err.msg });
  }
};

//update user profile
export const updateUserProfile = async (req, res) => {
  const userId = req.user._id;
  const updateFields = req.body;

  try {
    // Check if the user is a Candidate and fetch associated data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update basic user information (name, email, password) if provided
    if (updateFields.name) user.name = updateFields.name;
    if (updateFields.email) user.email = updateFields.email;
    if (updateFields.password) user.password = updateFields.password;

    // If user is a Candidate, update additional fields in the Candidate schema
    if (user.role === "Candidate") {
      const candidate = await Candidate.findOne({ user: userId });
      if (candidate) {
        // Update education details, skills, experience, certifications, etc.
        if (updateFields.education)
          candidate.education = updateFields.education;
        if (updateFields.skills) candidate.skills = updateFields.skills;
        if (updateFields.experience)
          candidate.experience = updateFields.experience;
        if (updateFields.certifications)
          candidate.certifications = updateFields.certifications;
        if (updateFields.resume) candidate.resume = updateFields.resume; // resume should be always either a URL or file path

        await candidate.save();
      } else {
        return res.status(404).json({ message: "Candidate not found" });
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

// Delete user account
export const deleteUserAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If candidate, delete candidate profile
    if (user.role === "Candidate") {
      await Candidate.findOneAndDelete({ userId: user._id });
    }

    await user.deleteOne();

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete account", error: error.message });
  }
};

// Get all candidates (for recruiters/admin)
export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().populate("userId", "-password");
    res.status(200).json({ candidates });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch candidates", error: error.message });
  }
};

export const verifyPhoneNumber = async (req, res) => {
  const { country, phoneNumber } = req.body;
  try {
    const validationResult = validatePhoneNumber(country, phoneNumber);
    if (!validationResult.valid) {
      return res.status(400).json({ message: validationResult.message });
    }

    // Proceed with storing the phone number
    res.status(200).json({ message: "Phone number is valid." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
