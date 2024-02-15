const express = require("express");
const mongoose = require("mongoose");
const cartRouter = require("./routes/cartRoute");
const ejs = require("ejs");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 3000;
app.use("/api/v1/cart", cartRouter);
app.set("view engine", "ejs");

// ------------------------------------------------------------------------------------------- Main Root
app.get("/", (req, res) => {
  res.render("profile.ejs");
});
// ------------------------------------------------------------------------------------------- Main Root
mongoose
  .connect("mongodb://localhost:27017/ECommerce")
  .then(() => {
    console.log("Connected To Database Succssefuly");
  })
  .catch((Error) => {
    console.log(`Error In Connection: ${Error}`);
  });

app.listen(port, () => {
  console.log(`Connected To Port ${port}`);
});
