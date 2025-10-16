const mongoose = require("mongoose");

const database_uri ="mongodb://localhost:27017/Project1"

async function ConnectDb(database_uri) {
    try {
        await mongoose.connect(database_uri);
        console.log("database connected successfully...");     
    } catch (err) {
        console.error(err)        
    }

}

module.exports = {ConnectDb:ConnectDb}