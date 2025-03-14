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