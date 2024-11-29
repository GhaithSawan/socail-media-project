const mongoose = require("mongoose");
module.exports = async () => {
  try {
    const dbURI = "mongodb+srv://ghaithx1x2x3:ghaithwaw__1@cluster0.11picll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(dbURI);
    console.log("DB Connected successfully");
  } catch (error) {
    console.log("DB connection error:", error);
  }
};