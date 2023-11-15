const mongoose = require("mongoose");
const colors = require("colors");

exports.connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connection to DB`.bgBlue.white);
  } catch (e) {
    console.log(`${e}`.bgRed.white);
  }
};
