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

const login=()=>async(req,res)=>{
try {
    const { email, password } = req.body;
    let alrdyUser=await User.findOne({email:email});

    if(!alrdyUser){
        res.status(201).send("user does not exist");
        return;
    }
    let passwodConfirmation=await bcrypt.compare(password,alrdyUser.password);
    if(!passwodConfirmation){
        res.status(202).send("Invalid Password...");
        return;
    }
    else {
        let token=jwt.sign({userId:alrdyUser._id}.jwtsecret);
        res.status(200).send({token:token,user:alrdyUser})
    }
    res.status(200).send(createdUser);
} catch (error) {
    res.status(400).send(err);
    
}
}

module.exports={register}