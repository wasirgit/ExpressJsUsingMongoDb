const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const userSchema = require("../schemas/todoSchema");

const User = new mongoose.model("User", userSchema);

// signup
router.post("/signup", async (req, res) => {
 
});
module.exports = router;
