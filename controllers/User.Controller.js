const { sendResponse } = require("../utils/utilsHandler");
const { User } = require("@models/");
const bcrypt = require("bcrypt");



exports.getUserProfile = async(req, res) => {
    try{
        const user = await User.findOne({ where: { id:req.user.id } });
        let data = user.toJSON()
        return sendResponse(res, 200, true, "Authentication successfull", data=data, )
    }
    catch(error){
        return sendResponse(res, 500, false, error.message)

    }

}

exports.updateUserProfile = async(req, res) =>{
    try{
        const { firstName, lastName, email, phone, password } = req.body;
    let updatedFields = { firstName, lastName, email, phone, password };
    updatedFields = Object.fromEntries(Object.entries(updatedFields).filter(([_, value]) => value !== ""));
    if (password) {
        updatedFields.password = await bcrypt.hash(password, 10);
    }
    const [rowsUpdated] = await User.update(updatedFields, { where: { id: req.user.id } });
    const updatedUser = await User.findByPk(req.user.id, { attributes: { exclude: ["password"] } });
    return sendResponse(res, 200, true, "User updated successfully", updatedUser.toJSON());
    }
    catch(error){
        return sendResponse(res, 500, false, error.message)
    }
}