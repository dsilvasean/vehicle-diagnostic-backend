const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("@models/");

exports.registerUser = async (req, res) =>{
    try{
        console.log(req.body)
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newUser = await User.create({ name, email, password: password});
        res.status(201).json({status:true, message: "User registered successfully", id: newUser.id });
    }
    catch (error) {
        res.status(500).json({status:false, error:error.message})
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(email, password, user, passwordMatch)
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ status:false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ status:true, message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};