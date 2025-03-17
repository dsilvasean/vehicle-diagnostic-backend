const { sendResponse } = require("@utils/utilsHandler");
const { User } = require("@models/");
const jwt = require("jsonwebtoken");


exports.getresult = async (req, res) => {
    try {
        console.log(req.body)
        const {query} = req.body;
        let data = {};
        let response_ = "";

        if (query){
            console.log("queryyy")
        // logic to connect with nlp and get response
        response_ = `The nlp model responsed with ${query}` 
        }
        data["response"] = response_
        res.status(201).json({status:true, data:data});
    }
    catch(error){
        res.status(500).json({status:false, error:error.message})

    }
}

exports.uploadData = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No data uploaded" });
        }
        const updatedRow = await User.update(
            { avatar: req.filename },
            { where: { id: req.user.id } }
        );
        const updatedUser = await User.findByPk(req.user.id);
        return sendResponse(res,200, true, "Data uploaded successfullyyyyyy", data={url:updatedUser.avatar});

    } catch (error) {
        return sendResponse(res, 500, false, error.message)
    }
}

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