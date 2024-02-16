//hager//////////////////////////////////////////////////////
require('dotenv').config();

const express = require('express');
const app = express();

require("./DB/index");



//////////////////////////////////
//routes
const userRouter = require('./routes/user.router');  



//////////////////////////////////
//middle ware functions
app.use(express.json());
app.use(express.static("public"));


app.use("/api/v1",userRouter);




////////////////////////////////
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Listening on port ${port} ....`);
})
//hager
/////////////////////////////////////////////////////////////////////////////////////////

// const mongoose = require("mongoose");
// const cartRouter = require("./routes/cartRoute");
// const categoriesRouter = require("./routes/categoryRoute")

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use("/api/v1/cart", cartRouter);
// app.use("/api/v1/category", categoriesRouter);
// mongoose
//   .connect("mongodb://127.0.0.1:27017/ECommerce")
//   .then(() => {
//     console.log("Connected To Database");
//   })
//   .catch((Error) => {
//     console.log(`Error In Connection: ${Error}`);
//   });

// app.listen(3000);
// // changing from 
// //commint
// //commint2
// //another test