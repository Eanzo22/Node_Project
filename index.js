require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cartRouter = require("./routes/cartRoute");
const categoriesRouter = require("./routes/categoryRoute");
const productRouter = require("./routes/productRoute");
const ordersRouter = require("./routes/orderRouter");
const userRouter = require("./routes/user.router");
const adminRouter=require('./routes/admin.router');
const app = express();
const {userAuth} = require('./middleware/userAuth')
const {adminAuth} = require('./middleware/adminAuth')
require("./DB/index");

//////////////////////////////////
//routes

//////////////////////////////////
//middle ware functions
app.use(express.static("public"));
app.use(express.json());
// app.set("view engine", "ejs");

//////////////////////////////////Routs//////////////////////////////////
app.use("/api/v1", userRouter);
app.use(adminAuth)
app.use("/api/v1/admin",adminRouter);
app.use(userAuth)
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/category", categoriesRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/orders", ordersRouter);
// mongoose
//   .connect("mongodb://localhost:27017/ECommerce")
//   .then(() => {
//     console.log("Connected To Database");
//   })
//   .catch((Error) => {
//     console.log(`Error In Connection: ${Error}`);
//   });

app.listen(3000);
