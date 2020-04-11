require("dotenv").config();
const express =  require("express");
const app = express();
const bodyParser = require("body-parser");
const cors =require("cors");
const db = require("./models");
const PORT = process.env.PORT || 8081;
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const {loginRequired,ensureCorrectUser} = require("./middleware/auth");
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth",authRoutes);
app.use("/api/users/:id/messages",loginRequired,ensureCorrectUser,messagesRoutes);
app.get("/api/messages",loginRequired,async function(req,res,next){
try {
    let messages = await db.Message.find()
    .sort({createdAt: "desc"})
    .populate("user",{ username: true,profileImageurl:true});
    return res.status(200).json(messages);
} catch (err) {
    return next(err);
}
});
//routes here and error handler
app.use(function(req,res,next){
    let err = new Error('Not Found!');
    err.status = 404;
    next(err);
});
app.use(errorHandler);

app.listen(PORT,function(){
    console.log(`Server starting on Port ${PORT}`);
});