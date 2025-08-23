const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createResume, getResumeById, getUserResumes, updateResume, deleteResume } = require("../controllers/resumeController");
const uploadResumeImages = require("../controllers/uploadImages");
const resumeRouter = express.Router();

resumeRouter.post("/", protect, createResume)
resumeRouter.get("/", protect, getUserResumes)
resumeRouter.get("/:id", protect, getResumeById)

resumeRouter.put("/:id", protect, updateResume)
resumeRouter.put("/:id/upload-images", protect, uploadResumeImages)

resumeRouter.delete("/:id", protect, deleteResume)

module.exports = resumeRouter;