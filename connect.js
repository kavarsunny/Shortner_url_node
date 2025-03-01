// const mongoose = require('mongoose');
// mongoose.set("strictQuery", true);

// // Function to connect to MongoDB
// async function connectTOMongoDB(url) {
//     try {
//         await mongoose.connect(url, { useNewUrlParser: true });
//         console.log("MongoDB Connected");
//     } catch (err) {
//         console.error("MongoDB connection error:", err);
//         throw err; // Ensure errors are thrown to propagate the issue
//     }
// }

// module.exports = {
//     connectTOMongoDB,
// };

// connect.js
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectTOMongoDB(url) {
  try {
    await mongoose.connect(url, { useNewUrlParser: true });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

module.exports = { connectTOMongoDB };
