const jwt = require('jsonwebtoken');
const User = require('../model/user');

require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET_KEY;

const authMiddleware = (req, res, next) => {
    try{
        let token = req.headers.authorization.split(' ')[1] || req.headers.authorization;

        const { email, password } = req.body;

        jwt.verify(token, jwtSecret, (err, decoded) => {

            if(err){
                return res.status(400).send("Authentication failed");
                
            }
            
            next();
        })

    }
    catch(err){
        res.status(500).send(err);
    }
}

module.exports = authMiddleware;