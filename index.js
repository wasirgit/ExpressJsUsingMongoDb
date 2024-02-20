const express = require("express");
const mongoose = require("mongoose");
// initiate express app
const app = express();
app.use(express.json);

// connect to database

mongoose
  .connect("mongodb://localhost:27017/todos")
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(`Error ${err}`);
  });

  
// default error handling
function errorHandler(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(3000, () => {
  console.log("app is listening to 3000 port");
});
