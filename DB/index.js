require('dotenv').config();
const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL;

const dbConnection = mongoose.connect(dbUrl)                   //connect function return promise
.then(()=> console.log("Connected to MongoDB..."))
.catch((err)=> console.log("could not connect to MonggoDB...",err));


module.exports = dbConnection;