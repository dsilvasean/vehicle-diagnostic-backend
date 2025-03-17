const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require('fs');
const path = require('path');


exports.sendResponse = (res, status, success, message, data = {}, extras={}) => {
    return res.status(status).json({ success:success, message:message, data:data, extras:extras});
};

exports.CreateJWTToken = (userId, duration) =>{
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, { expiresIn: '12h' })
}



// Delete a file if it exists
exports.deleteFile = (filePath) => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    }
};


