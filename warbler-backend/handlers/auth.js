const db= require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req,res,next){
//find user match password stored on server then login by creating json token nd sending back as response
try {
    let user = await db.User.findOne({
        email: req.body.email
    });
    let {id,username,profileImageUrl} = user;
    let isMatch = await user.comparePassword(req.body.password);
    if(isMatch)
    {
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        },
        process.env.SECRET_KEY);
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    }
    else{
        return next({
        status: 400,
        message: "Invalid email/Password"
        });
    }
    
} catch (err) {
    return next({
        status: 400,
        message: "Invalid email/Password"
        });
}
};


exports.signup = async function(req,res,next){
try {
    //create user-then create a token(to crate token process.env.SECRET_KEY)
    let user = await db.User.create(req.body);
   let {id,username,profileImageUrl} = user;
   let token =jwt.sign({
       id,
       username,
       profileImageUrl
   },process.env.SECRET_KEY);
   return res.status(200).json({
       id,
       username,
       profileImageUrl,
       token
   });
} catch (err) {
    //see type of err respond with username/email already taken or 400
    if(err.code === 11000)
    {
        err.message = "Sorry,that username/email is already taken";
    }
    return next({
        status: 400,
        message: err.message
    });
}
};
//module.exports = db;