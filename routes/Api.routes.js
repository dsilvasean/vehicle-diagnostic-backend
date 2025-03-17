const express = require('express');
const router = express.Router();

const authenticateToken = require("../middleware/auth");
const upload = require('../middleware/uploadMiddleware');

const { registerUser, loginUser } = require("@controllers/Auth.Controller");
const { getresult, uploadData, getUserProfile } = require("@controllers/Core.Controller");

// Authentication routes
router.post("/user/register", registerUser)
router.post("/user/login", loginUser)
router.post("/user/edit")


// Core Functionality routes
router.get("/user/profile", authenticateToken, getUserProfile)
router.post("/chat", getresult)
router.post("/upload", authenticateToken, upload.single('file'), uploadData)





module.exports = router