const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


require("dotenv").config();
const jwtsecret = process.env.JWT_SECRET_KEY;


const register = async (req, res) => {
    try {


        const { email, password } = req.body;
        let hashedPassword = await bcrypt.hash(password);

        let createdUser = await User.create({
            email,
            passwod: hashedPassword
        })
        res.status(200).send(createdUser);
    } catch (error) {
        res.status(400).send(error)
    }
}



module.exports={register}