const jwt = require("jsonwebtoken");
require("dotenv").config(); 

/**
 * Middleware to authenticate JWT
 */
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
        }
        req.user = user; // Store decoded user data in request
        next();
    });
};

module.exports = authenticateToken;

