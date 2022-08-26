const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://shazanrizvi:SAmY9panHWZQ6xDk@cluster0.2ikbxyq.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to database successfully");
  });
};

module.exports = connectToMongo;
