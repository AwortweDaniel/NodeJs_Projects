const express = require("express");
const {ConnectDb} = require("./database/db");
const userModel = require("./model/Users");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

//DATABASE CONNECTION
ConnectDb("mongodb://localhost:27017/Project1");
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})

//ROUTES

app.get("/api/users", async (req, res)=>{
    try {
        const users = await userModel.find()

        if(users.length>0) {
            res.status(200).json(users);
        }else{
            res.status(500).json("No users found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Could not fetch users");
    }
})

app.get("/api/users/:id", async(req, res)=>{
    const id = req.params.id;
    try{
        const user = await userModel.findById(id);
        res.status(200).json(user);

    }catch(err){
        console.error(err);
        res.status(500).json({err:`could not get usser by id, ${id}`})
    }
})

app.post("/api/users", async (req, res)=>{
    try{
        const user = req.body;

        const results = await userModel.insertOne(user);
        res.status(200).json(results)
    }catch(err){
        console.error(err);
        res.status(500).json({err:"Could not add user"});
    }
})

app.delete("/api/users/:id", async(req, res)=>{
    const id = req.params.id;
    try{
        const user = await userModel.findByIdAndDelete(id);
        if(user){
            res.status(200).json("User deleted successfully!",user);
        }
    }catch(err){
        console.error(err);
        res.status(500).json(`Could not delete ${user}`)
    }
})

app.patch("/api/users/:id", async(req, res)=>{
    const id= req.params.id;
    const update = req.body;
    try{
        const user = await userModel.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
        });
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json("User not found")
        }
    }catch(err){
        console.error(err);
        res.status(500).json("Could not update user");
    }
})