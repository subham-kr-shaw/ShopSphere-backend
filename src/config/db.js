const mongoose = require("mongoose");
require("dotenv").config();

const connectdb = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to MongoDB");
}; 

module.exports = connectdb;