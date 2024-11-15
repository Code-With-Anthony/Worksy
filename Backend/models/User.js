import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Roles } from "../constants/Roles.js";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: [Roles.CANDIDATE, Roles.RECRUITER, Roles.USER, Roles.ADMIN],
    default: Roles.USER,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//function to perform some operation before saving the data in db
userSchema.pre("save", async function (next) {
  // Check if the password field was modified
  if (!this.isModified("password")) {
    return next(); // Skip hashing if the password was not modified
  }

  this.password = await hashPassword(this.password);
  next();
});

//function to hash the password
const hashPassword = async (pwd) => {
  const salt = await bcrypt.genSalt(5);
  return await bcrypt.hash(pwd, salt);
};

//function to perform comparision between given password and hashed password
userSchema.methods.verifyPwd = async function (pwd) {
  return bcrypt.compare(pwd, this.password);
};

//function to create jwt token by taking role and user's id
userSchema.methods.createJwt = function () {
  console.log("JWT_SECRET_KEY in createJwt:", process.env.JWT_SECRET_KEY);
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "3h" }
  );
};

const User = mongoose.model("User", userSchema);
export default User;
