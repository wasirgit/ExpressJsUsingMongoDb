const express = require("express");
const router = express.Router();

// get all todos
router.get("/", async (req, res) => {});
// get a todos by ID
router.get("/:id", async (req, res) => {});

//post a todo
router.post("/", async (req, res) => {});
//post multiple todos
router.post("/all", async (req, res) => {});
// Put a todo
router.put("/:id", async (req, res) => {});
// delete a todo
router.delete("/:id", async (req, res) => {});

module.exports = router;
