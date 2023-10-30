const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


require("dotenv").config();
const jwtsecret = process.env.JWT_SECRET_KEY;


const register = async (req, res) => {
    try {


        const { email, password } = req.body;
        let hashedPassword = await bcrypt.hash(password,10);

        let createdUser = new User({
            email,
             password: hashedPassword

        })
        await createdUser.save();
        res.status(200).send({ "msg": "user Create succsesfully" });
    } catch (error) {
        res.status(400).send(error)
    }
}

const login =  async (req, res) => {
    try {
        const { email, password } = req.body;
        let alrdyUser = await User.findOne({ email: email });
console.log(alrdyUser);
        if (!alrdyUser) {
            return res.status(404).send("user does not exist");
            
        }
        let passwodConfirmation = await bcrypt.compare(password, alrdyUser.password);
        if (!passwodConfirmation) {
            return res.status(202).send("Invalid Credentials");
            
        }
       
            const token = jwt.sign({ userId: alrdyUser._id }, jwtsecret);

            res.status(200).send({ token: token, user: alrdyUser })
        
        // res.status(200).send({"msg":"loggedIn"});
    } catch (error) {
        res.status(400).send(err);

    }
}

module.exports = { register, login }