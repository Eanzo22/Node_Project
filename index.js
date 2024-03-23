require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cartRouter = require("./routes/cartRoute");
const categoriesRouter = require("./routes/categoryRoute");
const productRouter = require("./routes/productRoute");
const ordersRouter = require("./routes/orderRouter");
const userRouter = require("./routes/user.router");
const adminRouter = require("./routes/admin.router");
const paymentRouter = require("./routes/payment.router");
const app = express();
const { userAuth } = require("./middleware/userAuth");
const { adminAuth } = require("./middleware/adminAuth");
require("./DB/index");

/////////////////////////////////////////////////////////////////////////
//to link front and back although running on different ports  Cross-Origin Resource Sharing (CORS)
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Replace * with the specific domain of your frontend
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');                       //don't forget to add useremail to allow send data in the header
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept ,useremail');
  next();
});
  
//////////////////////////////////////////////////////////////////////////
//middle ware functions
app.use(express.static("public"));
app.use(express.json());
app.use(express.static("public"));
// app.set('view engine','ejs');
// app.set("view engine", "ejs");

//////////////////////////////////Routs//////////////////////////////////

app.use("/api/v1/", userRouter);
app.use("/api/v1", userRouter);
// app.use(adminAuth)
app.use("/api/v1/admin", adminAuth, adminRouter);
// app.use(userAuth)
app.use("/api/v1/cart", userAuth, cartRouter);
app.use("/api/v1/category", userAuth, categoriesRouter);
app.use("/api/v1/product", userAuth, productRouter);
app.use("/api/v1/orders", userAuth, ordersRouter);
app.use("/api/v1/payment",userAuth, paymentRouter);
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
