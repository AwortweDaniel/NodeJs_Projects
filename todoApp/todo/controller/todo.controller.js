const { todoModel } = require("../Model/todo.model");
const asyncHandler = require("express-async-handler")

//get all todo 
const getAllTodo = asyncHandler(async (req, res)=>{
    try {
        const todos = await todoModel.find();
        
        if(!todos){
            res.status(400).json("No todo in the database");
        }

        res.status(200).json(todos);
    } catch (error) {
        res.status(500).send(error.message);
    }
})


//get a single todo
const getSingletodo = asyncHandler(async (req, res)=>{
    const id = req.params.id;
    try {
        const singletodo = await todoModel.findById(id);
        if(!singletodo){
            console.log(`No todo with id,${id} found,\nTry a new id`);
        }

        res.status(200).json(singletodo);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

//create new todo
const createtodo = asyncHandler(async(req, res)=>{
    try {
        const todoData = req.body;
        let {firstname, lastname, email, phonenumber} = todoData;
        const emails = Array.isArray(email)?email:[email];
        const phonenumbers = Array.isArray(phonenumber)?phonenumber:[phonenumber]


        const newtodo = await todoModel.create({
            firstname,
            lastname,
            email: emails,
            phonenumber: phonenumbers 
        });

        res.status(200).json({success:true, data:newtodo})
    } catch (error) {
        res.status(500).send(error.message);
    }
})

//Update todo
const updatetodo = asyncHandler(async(req,res)=>{
     const id = req.params.id;
     const update = req.body;
    try {
        if(update.email && !Array.isArray(update.email)){
            update.email=[update.email]
        }

        if(update.phonenumber && !Array.isArray(update.phonenumber)){
            update.phonenumber=[update.phonenumber]
        }


        const updatetodo = await todoModel.findByIdAndUpdate(id, update, {
            new:true,
            runValidators:true
        });
        if(!updatetodo){
            console.log(`No todo with id,${id} found,\nTry a new id`);
        }
        res.status(200).json({success:true, data:updatetodo});
    } catch (error) {
        res.status(500).send(error.message);
    }
})

//Delete todo
const deletetodo = asyncHandler(async(req, res)=>{
     const id = req.params.id;
    try {
        const deletetodo = await todoModel.findByIdAndDelete(id);
        if(!deletetodo){
            console.log(`No todo with id,${id} found,\nTry a new id`);
        }
        res.status(200).json({success:true, data:`todo with id ${id} deleted successfully`});
    } catch (error) {
        res.status(500).send(error.message);
    }
})

//block todo
const markDonetodo = asyncHandler(async(req, res)=>{
     const id = req.params.id;
    try {
        const todo = await todoModel.findById(id);
        if(!todo){
            console.log(`No todo with id,${id} found,\nTry a new id`);
        }
        todo.blocked = !todo.blocked
        await todo.save();

        res.status(200).json({success:true, data:todo});
    } catch (error) {
        res.status(500).send(error.message);
    }
})

//favourite todo
const favouritetodo = asyncHandler(async(req, res)=>{
     const id = req.params.id;
    try {
        const todo = await todoModel.findById(id);
        if(!todo){
            console.log(`No todo with id,${id} found,\nTry a new id`);
        }
        todo.favourite = !todo.favourite
        await todo.save();

        res.status(200).json({success:true, data:todo});
    } catch (error) {
        res.status(500).send(error.message);
    }
})

//getFavorite todo
const getDailytodo = asyncHandler(async(req, res)=>{
    try {
        const favouritetodo = await todoModel.find({favourite:true})
        res.status(200).json({success:true, data:favouritetodo})
    } catch (error) {
        res.status(500).send(error.message);
    }
})


//getblock todo
const getDonetodo = asyncHandler(async(req, res)=>{
    try {
        const blockedtodo = await todoModel.find({blocked:true})
        res.status(200).json({success:true, data:blockedtodo})
    } catch (error) {
        res.status(500).send(error.message);
    }
})


module.exports= {
    getAlltodo,
    getSingletodo,
    createtodo,
    updatetodo,
    deletetodo,
    markDonetodo,
    favouritetodo,
    getDailytodo,
    getDonetodo,
}