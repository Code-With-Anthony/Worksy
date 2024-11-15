import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/connect.js";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import { verifyPhoneNumber } from "./controllers/Common/userController.js";
const app = express();

// Load environment variables from.env file
dotenv.config();

app.use(express.json());
app.use(cors());

//auth routes
app.use("/api/auth", authRoutes);
// app.use("/api/jobs", jobRoutes);

//candidate routes
app.use("/api/candidate", candidateRoutes);

//recruiter routes
app.use("/api/recruiter", recruiterRoutes);

//testing phone number route
app.use("/api/phone", verifyPhoneNumber);

//admin routes
// app.use("/api/admin/users");
// app.use("api/admin/candidates");
// app.use("/api/recruiter");
// app.use("/api/admin/jobs");
// app.use("/api/admin/manage-users/:userId/edit");
// app.use("/api/admin/manage-users/:userId/delete");
// app.use("/api/admin/manage-jobs/:jobId/edit");
// app.use("/api/admin/manage-jobs/:jobId/delete");
// app.use("/api/admin/manage-recruiter/:recruiterId/edit");
// app.use("/api/admin/manage-recruiter/:recruiterId/delete");

//server setup
const PORT = process.env.PORT || 5000;

//function to start express server
const startApp = () => {
  connectDB(process.env.DB_URI)
    .then(() => {
      app.listen(PORT, async () => {
        console.log(`Server is running at port ${PORT}`);
        console.log(`Connected with Database...`);
      });
    })
    .catch((err) => console.error(err));
};

startApp();
