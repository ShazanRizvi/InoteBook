const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://shazanrizvi:SAmY9panHWZQ6xDk@cluster0.8cbxbbo.mongodb.net/test";

const connectToMongo = async() => {
  try {
    await mongoose.connect(mongoURI, () => {
      console.log("connected to database successfully");
    });
  } catch (error) {
    console.log('Failed to connect to MongoDB', err);
  }
};



module.exports = connectToMongo;

