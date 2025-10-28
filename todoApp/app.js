const express = require("express");
const bodyparser = require("body-parser")
const {connectdb} = require("./database/db")

const todoRouter = require("./todo/route/todo.route");

const {errorHandler} = require("./middleware/errorhandler.middleware")

require("dotenv").config()
const {PORT, URL} = process.env

connectdb(URL);
const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.use("/api/todo", todoRouter);

app.use(errorHandler)

module.exports = app