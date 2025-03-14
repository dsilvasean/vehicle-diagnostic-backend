const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require("@controllers/Auth.Controller");
const { getresult } = require("@controllers/Core.Controller");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * tags:
 *   name: General
 *   description: General API enpoints
 */

/**
 * @swagger
 * /api/register-user:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/register-user", registerUser)
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/user/login", loginUser)


/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: API to interact with the assistant
 *     description: Accepts a JSON object and returns the same data with a success message.
 *     tags: 
 *       - General
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 example: "Why is my engine overheating"
 *     responses:
 *       200:
 *         description: Successfully processed request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Data received successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     response:
 *                       type: string
 *                       example: "Becase of so and so reason"
 */

router.post("/chat", getresult)





module.exports = router