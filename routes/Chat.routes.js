const express = require("express");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/auth"); // Ensure you have auth middleware
const router = express.Router();

module.exports = (io) => {
    const userSockets = new Map(); // Store userID → socketID mapping

    router.post("/connect", authenticateToken, async (req, res) => {
        try {
            const { frontendSocketID } = req.body.socketData;
            if (!frontendSocketID) {
                return res.status(400).json({ success: false, message: "Frontend socket ID is required" });
            }

            const userID = req.user.id; // Extracted from JWT token
            userSockets.set(userID, frontendSocketID); // Store mapping
            
            // Emit an event to the connected socket
            io.to(frontendSocketID).emit("connected", {
                message: "Connected to backend Socket.IO",
                backendSocketID: frontendSocketID
            });

            return res.json({
                success: true,
                message: "Socket connected successfully",
                socketData: { backendSocketID: frontendSocketID }
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    });

    return router;
};
