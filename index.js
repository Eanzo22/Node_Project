const express = require("express");
const mongoose = require("mongoose");
const cartRouter = require("./routes/cartRoute");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/cart", cartRouter);
mongoose
  .connect("mongodb://127.0.0.1:27017/ECommerce")
  .then(() => {
    console.log("Connected To Database");
  })
  .catch((Error) => {
    console.log(`Error In Connection: ${Error}`);
  });

app.listen(3000);
// changing from 
//commint
//commint2
//another test