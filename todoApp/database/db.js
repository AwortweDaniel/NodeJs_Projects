const mongoose = require("mongoose")

const { URL } = process.env

async function connectdb(URL){
  try {
    await mongoose.connect(URL)
    console.log(`database connected successfully`)
  } catch (error) {
    console.error(error)
    console.log("Connection failed!")
  }  
} 

module.exports = {connectdb}