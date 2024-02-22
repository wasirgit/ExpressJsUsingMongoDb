const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");

const Todo = new mongoose.model("Todo", todoSchema);
console.log("Enter to todo handler");
// get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "There was a server side error" });
  }
});
// get a todos by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
  try {
    const todos = await Todo.findById(id);
    if (!todos) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "There was a server side error" });
  }
});

// POST A TODO
router.post("/", async (req, res) => {
  console.log("saving todo into databse");
  const newTodo = new Todo(req.body);
  try {
    await newTodo.save();
    res.status(200).json({ message: "Todo was inserted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "There was a server side error!" });
  }
});
//post multiple todos
router.post("/all", async (req, res) => {
  console.log("saving multiples todos into databse");
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({ message: "Todos were inserted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "There was a server side error!" });
  }
});
// Put a todo
router.put("/:id", async (req, res) => {
  console.log(`updating todo ${req.params.id}`);
  const { id } = req.params;
  const update = req.body;

  try {
    // findByIdAndUpdate method
    const updatedTodo = await Todo.findByIdAndUpdate(id, update, {
      new: true, // Return the updated document
      // Optionally, you can use other options like: upsert, runValidators, etc.
    });

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "There was a server side error" });
  }
});
// delete a todo
router.delete("/:id", async (req, res) => {
  console.log(`updating todo ${req.params.id}`);
  const { id } = req.params;

  try {
    const deleteTodo = await Todo.findByIdAndDelete(id);
    if (!deleteTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: "There was a server side error" });
  }
});

module.exports = router;
