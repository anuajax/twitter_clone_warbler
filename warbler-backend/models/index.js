const mongoose = require("mongoose");
mongoose.set("debug",true);
mongoose.Promise = Promise;
const connection = "mongodb+srv://<your_username>:<your_password>@cluster<number>-5c5ij.mongodb.net/<database_name>r?retryWrites=true&w=majority";
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));
module.exports.User = require("./user");
module.exports.Message =require("./message");
