import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import { InitiateMongoServer } from "./config/db";
import { getUserId } from "./middleware";
import s3Routes from "./routes/s3";
import userRoutes from "./routes/user";

require("dotenv").config();

// Express server
const app = express();

app.set("trust proxy", 1);

// Cors configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(getUserId);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/s3", s3Routes);

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

// Connect to DB
InitiateMongoServer();
