const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    //  Connect to Mongo DB
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log("Mongo DB Connected");
  } catch (error) {
    conlog.log(`Error Code : ${error.statusCode}`);
    conlog.log(`Error Message: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
