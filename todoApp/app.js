const express = require("express");
const bodyparser = require("body-parser")
const {connectdb} = require("./database/db")

require("dotenv").config()
const {PORT, URL} = process.env

connectdb(URL);
const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


module.exports = app