const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
