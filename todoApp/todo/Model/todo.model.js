const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type:String, 
        required:true
    },
    description:{
        type:String, 
        required:true
    },
    createdby:{
        type:String, 
        required:true
    },
    due_date:{
        type:Date,
        required:true
    },
    task_done:{
        type:Boolean,
        default:false
    }
})

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = {todoModel}