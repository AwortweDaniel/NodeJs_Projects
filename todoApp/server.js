const app = require("./app");

const {PORT}= process.env

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}...`)
})