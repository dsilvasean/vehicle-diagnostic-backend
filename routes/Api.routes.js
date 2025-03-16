const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require("@controllers/Auth.Controller");
const { getresult } = require("@controllers/Core.Controller");

// Authentication routes
router.post("/user/register", registerUser)
router.post("/user/login", loginUser)


// Core Functionality routes
router.post("/chat", getresult)





module.exports = router