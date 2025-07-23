const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MY_MONGO_URI);
const db = mongoose.connection;

// Eventos
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to MongoDB established"));

module.exports = mongoose;