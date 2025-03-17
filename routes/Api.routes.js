const express = require('express');
const router = express.Router();

const authenticateToken = require("../middleware/auth");
const upload = require('../middleware/uploadMiddleware');

const { registerUser, loginUser } = require("@controllers/Auth.Controller");
const { getresult, uploadData } = require("@controllers/Core.Controller");
const { getUserProfile, updateUserProfile } = require("@controllers/User.Controller");

// Authentication routes
router.post("/user/register", registerUser)
router.post("/user/login", loginUser)

// User Routes
router.post("/user/edit", authenticateToken, updateUserProfile)
router.get("/user/profile", authenticateToken, getUserProfile)


// Core Functionality routes
router.post("/chat", getresult)
router.post("/upload", authenticateToken, upload.single('file'), uploadData)





module.exports = router