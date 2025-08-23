const express = require("express");
const { register, login, getUserProfile, registerUser, loginUser } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/profile", protect, getUserProfile)

module.exports = userRouter;