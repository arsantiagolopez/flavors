import Router from "express";
import { deleteImageFromBucket, generateUploadURL } from "../controllers/s3";
import { isAuthenticated } from "../middleware";

const router = Router();

// Generates upload url from AWS
router.get("/url", isAuthenticated, generateUploadURL);

// Deletes image object from s3 bucket
router.post("/delete", isAuthenticated, deleteImageFromBucket);

export { router as s3Routes };
