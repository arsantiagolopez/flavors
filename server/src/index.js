import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import { InitiateMongoServer } from "./config/db";
import { getUserId } from "./middleware";
import { plateRoutes, s3Routes, sellRoutes, userRoutes } from "./routes";

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
app.use("/api/plates", plateRoutes);
app.use("/api/sell", sellRoutes);

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

// Connect to DB
InitiateMongoServer();
