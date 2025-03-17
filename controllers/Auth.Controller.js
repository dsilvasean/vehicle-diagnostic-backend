const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("@models/");
const { sendResponse } = require("@utils/utilsHandler");

exports.registerUser = async (req, res) =>{
    try{
        console.log(req.body)
        const {firstName, lastName, email, phone, password} = req.body;
        if (!firstName || !lastName || !email || !password) {
            return sendResponse(res, 400, false, "required fields are not present")
        }
        let userData = { firstName, lastName, email, phone, password };
        userData = Object.fromEntries(
            Object.entries(userData).filter(([_, value]) => value !== "")
        );
        let newUser = await User.create(userData, { returning: true });
        const accessToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "6h" });
        const refreshToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        let data = newUser.toJSON()
        data.jwt_token = accessToken;
        data.jwt_refresh = refreshToken;
        let extras = "jwt_token_validity: 6h, jwt_refresh_validity: 1d"
        return sendResponse(res, 201, true, "User registered successfully", data=data, extras=extras)
    }
    catch (error) {
        return sendResponse(res, 500, false, error.message)
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return sendResponse(res, 400, false, "required fields are not present")
        }
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return sendResponse(res, 401, false, "Invalid Credentials")
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(email, password, user, passwordMatch)
        let data = user.toJSON()
        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "6h" });
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        data.jwt_token = accessToken;
        data.jwt_refresh = refreshToken;
        let extras = "jwt_token_validity: 6h, jwt_refresh_validity: 1d"

        return sendResponse(res, 200, true, "Authentication successfull", data=data, extras=extras)
    } catch (error) {
        return sendResponse(res, 500, false, error.message)
    }
};