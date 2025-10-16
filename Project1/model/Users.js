const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type:String},
    email: {type:String},
    message: {type:String},
});

const userModel = mongoose.model("User", userSchema); //"User" will be converted into "users";

module.exports = userModel;