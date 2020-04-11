require("dotenv").config();
const jwt = require("jsonwebtoken");
//make sure user is logged in-Authentication

exports.loginRequired = function(req,res,next){
    //get token from http header and decode it
    try{
const token = req.headers.authorization.split(" ")[1]; 
jwt.verify(token, process.env.SECRET_KEY, function(err,decoded){
if(decoded){
    return next();
}
else{
    return next({
        status: 401,
        message: "Please Login First!"
    });
}
});
    }
    catch(err){
        return next({
            status: 401,
            message: "Please Login First!"
        });
    };

}

//make sure correct user is logged in -Authorization
exports.ensureCorrectUser = function(req,res,next){
    try {
const token = req.headers.authorization.split(" ")[1]; 
jwt.verify(token, process.env.SECRET_KEY, function(err,decoded){
    if(decoded && decoded.id === req.params.id)
    {
        return next();
    }
    else{
        return next({
            status: 401,
            message: "Unauthorized user!"
        });
    }
});    
    } catch (err) {
        return next({
            status: 401,
            message: "Unauthorized user!"
        });
    }
};