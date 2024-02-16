const Cart = require("../models/cartModelDB");
const express = require("express");
const cookiesParser = require("cookie-parser");
const cartValidationRouts = require("../util/cartValidation");
const app = express();
app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Get the current user's shopping cart using _id

let getUserCart = async (req, res) => {
  // let cookieUserId = Buffer.from(req.cookies.id, "base64");

  let cookieUserId = "1";

  // let cart = await Cart().findById({ userId: cookieUserId });
  let cart = await Cart.find({ userId: cookieUserId });
  //   let cookieUserId = req.body.userId;
  //   let cart = await Cart().find({ userId: cookieUserId });
  if (cart) {
    res.send(cart);
  } else {
    return res.status(404).send(`User With Id: ${cookieUserId} Not Found`);
  }
};
// Add a product to the shopping cart
let addNewProToUserCart = (req, res) => {
  let valid = cartValidationRouts(req.body);
  // let cookieUserId = Buffer.from(req.cookies.id, "base64");

  let cart = new Cart({
    proId: req.body.proId,
    proName: req.body.proName,
    proDescription: req.body.proDescription,
    proCategory: req.body.proCategory,
    proPrice: req.body.proPrice,
    proImg: req.body.proImg,
    // userId: cookieUserId,
    userId: req.body.userId,
  });
  if (valid) {
    cart
      .save()
      .then(() => {
        res.send(cart);
      })
      .catch((err) => {
        res.status(400).send("Bad Request In Cart: " + err.errors);
      });
  } else {
    res.status(403).send("Data Validation Routs Not Valid");
  }
};
//Update a product in the shopping cart.
let updateProInUserCart = async (req, res) => {
  // let cookieUserId = Buffer.from(req.cookies.id, "base64");
  // let productIdParam = req.params.proId;
  let cookieUserId = JSON.parse(req.params.myObj).userId;

  let productIdParam = JSON.parse(req.params.myObj).proId;
  let upCart = await Cart.findOneAndUpdate(
    { userId: cookieUserId, proId: productIdParam },
    req.body,
    {
      returnOriginal: false,
    }
  );
  if (upCart) {
    res.send(upCart);
  } else {
    return res
      .status(404)
      .send(
        `User With Id: ${cookieUserId} or Product With Id: ${productIdParam} Not Found`
      );
  }
};
//Remove a product from the shopping cart.
let deleteOneProductFromUserCart = async (req, res) => {
  // let cookieUserId = Buffer.from(req.cookies.id, "base64");
  // let productIdParam = req.params.proId;
  let cookieUserId = JSON.parse(req.params.myObj).userId;

  let productIdParam = JSON.parse(req.params.myObj).proId;

  let DelOneCart = await Cart.findOneAndDelete({
    userId: cookieUserId,
    proId: productIdParam,
  });
  if (DelOneCart) {
    res.send("Product Deleted Successfuly");
  } else {
    return res
      .status(404)
      .send(
        `User With Id: ${cookieUserId} or Product With Id: ${productIdParam} Not Found`
      );
  }
};
//Clear the entire shopping cart.
let deleteAllUserCart = async (req, res) => {
  // let cookieUserId = Buffer.from(req.cookies.id, "base64");
  let cookieUserId = "1";

  let DelOneCart = await Cart.deleteMany({ userId: cookieUserId });
  if (DelOneCart) {
    res.send("Deleted Successfuly");
  } else {
    return res
      .status(404)
      .send(
        `User With Id: ${cookieUserId} or Product With Id: ${productIdParam} Not Found`
      );
  }
};

module.exports = {
  getUserCart,
  addNewProToUserCart,
  updateProInUserCart,
  deleteOneProductFromUserCart,
  deleteAllUserCart,
};
