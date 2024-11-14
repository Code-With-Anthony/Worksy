import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/connect.js";
import authRoutes from "./routes/auth.js";
const app = express();

// Load environment variables from.env file
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

//server setup
const PORT = process.env.PORT || 6000;

//function to start express server
const startApp = () => {
  connectDB(process.env.DB_URI)
    .then(() => {
      app.listen(PORT, async () => {
        console.log(`Server is running...`);
        console.log(`Connected with Database...`);
      });
    })
    .catch((err) => console.error(err));
};

startApp();
