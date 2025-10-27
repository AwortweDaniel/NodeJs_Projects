const express = require("express");
const router = express.Router();

const {
    getAlltodo,
    getSingletodo,
    createtodo,
    updatetodo,
    deletetodo,
    blocktodo,
    favouritetodo,
    markDonetodo,
    getDailytodo
} =require("../controller/todo.controller");

router.post("/", createtodo);

router.get("/", getAlltodo);

router.get("/block", getDonetodo);

router.get("/favourite", getDailytodo);

router.get("/:id", getSingletodo);

router.patch("/:id", updatetodo);

router.delete("/:id", deletetodo);

router.patch("/block/:id", markDonetodo);

router.patch("/favourite/:id", favouritetodo);

module.exports = router;