import User from "../../models/User.js";
import Candidate from "../../models/Candidate.js";
import { Roles } from "../../constants/Roles.js";
import Recruiter from "../../models/Recruister.js";

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  //getting the user from the db
  let user = await User.findOne({
    email: {
      $regex: `^${email}$`,
      $options: "i",
    },
  }).select("+password");

  if (!user) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  //if user exist then verifying the password
  const isMatch = await user.verifyPwd(password);

  //if invalid password
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  //if password matches then create the token
  const token = await user.createJwt();
  user = user.toObject();
  delete user.password;

  res.status(200).json({
    success: true,
    message: `Logged In`,
    data: {
      user,
      token,
    },
  });
};

export const updatedPassword = async (req, res, next) => {
  const { email, password } = req.body;

  //check if email exist
  const user = User.findOne({
    email: {
      $eq: email,
      $options: "i",
    },
  });

  //if password matches old password
  const isMatch = user.verifyPwd(password);

  //if invalid credentials then
  if (!isMatch || user) {
    res.status(400).json({ message: "Invalid Credentials" });
  }

  user.password = password;
  await user.save();
};

export const registerUser = async (req, res, next) => {
  const { email, password, role, name } = req.body;

  //check if email exist
  const user = await User.findOne({
    email: {
      $regex: `^${email}$`,
      $options: "i",
    },
  });

  //if email exist then
  if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = new User({ email, password, role, name });
  await newUser.save();

  // If the user is a candidate, create an entry in the Candidate schema
  if (role === Roles.CANDIDATE) {
    const newCandidate = new Candidate({
      userId: newUser._id,
    });
    await newCandidate.save();
  }

  //if the user is recruiter, create an entry in the Recruiter schema
  if (role === Roles.RECRUITER) {
    const newRecruiter = new Recruiter({
      userId: newUser._id,
    });
    await newRecruiter.save();
  }

  // //if all goes well then create the token
  // const token = await newUser.createJwt();
  // newUser = newUser.toObject();
  // delete newUser.password;

  // res.status(201).json({
  //   success: true,
  //   message: "User registered successfully",
  //   data: {
  //     user,
  //     // token,
  //   },
  // });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: newUser,
  });
};
