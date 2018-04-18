const db = require("../models");
const jwt = require("jsonwebtoken");

//Find a user, check their password, log them in (create jwt)
exports.signin = async function(req, res, next) {
    try {
        let user = await db.User.findOne({
            email : req.body.email
        });
        if (await user.comparePassword(req.body.password)) {
            let token = jwt.sign({
                id : user.id,
                username : user.username,
                profileImageUrl : user.profileImageUrl
            }, process.env.SECRET_KEY);
    
            return res.status(200).json({
                id : user.id,
                username : user.username,
                profileImageUrl : user.profileImageUrl,
                token : token
            });
        } else {

            return next({
                status: 400,
                message : "Invalid Email/Password"
            })
        }
    } catch(err) {
        return next({
            status: 400,
            message : "Invalid Email/Password"
        }) 
    }
}

//Sign up a new user
exports.signup = async function(req, res, next) {
    try {
        //create user
        let user = await db.User.create(req.body);

        //Generate token
        let token = jwt.sign({
            id : user.id,
            username : user.username,
            profileImageUrl : user.profileImageUrl
        }, process.env.SECRET_KEY);

        return res.status(200).json({
            id : user.id,
            username : user.username,
            profileImageUrl : user.profileImageUrl,
            token : token
        });
    } catch(err) {
        if(err.code === 11000) {
            err.message = "Sorry, that username and/or email is taken";
        }

        return next({
            status: 400,
            message : err.message
        }) 
    }
}