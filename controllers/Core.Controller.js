const { sendResponse } = require("@utils/utilsHandler");
const { User } = require("@models/");
const jwt = require("jsonwebtoken");
const axios = require('axios');

// const extractAssistantResponse = (text) => {
//     const match = text.match(/Assistant:\s*(.*)/s);
//     return match ? match[1].trim() : "No valid response found.";
// };

// // Example Usage
// const exampleText = "Context: Some diagnostic data...\n\nAssistant: Here is the response.";
// console.log(extractAssistantResponse(exampleText)); // Output: "Here is the response."


exports.getresult = async (req, res) => {

    try {
        console.log(req.body.message)
        const response = await axios.post(`${process.env.MODEL_BASE_API}/query`, {
            user_message: req.body.message
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }); 
        // console.log()
        // let res_ = "sdjhjkfdjn" 
        console.log(response)
        let resp_ = {sender:"AI", message:response.data.response}
        // const match = resp_.message.match(/Assistant:\s*(.*)/s);
        // const final_return = match ? match[1].trim() : "No valid response found.";
        // console.log(final_return)
        res.status(200).json({status:true, sender:"AI", message:resp_.message})
    } 
    catch(error){
        res.status(500).json({status:false, error:error.message})

    }
    // try {
    //     console.log(req.body)
    //     const {query} = req.body;   
    //     let data = {};
    //     let response_ = "";

    //     if (query){
    //         console.log("queryyy")
    //     // logic to connect with nlp and get response
    //     response_ = `The nlp model responsed with ${query}` 
    //     }
    //     data["response"] = response_
    //     res.status(201).json({status:true, data:data});
    // }
    // catch(error){
    //     res.status(500).json({status:false, error:error.message})

    // }
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

