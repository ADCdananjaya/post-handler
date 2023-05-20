const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/http")
  .then(() => console.log("Successfully connected to mongodb."))
  .catch((err) => console.log(err));
