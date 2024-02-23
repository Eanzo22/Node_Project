const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    proId: {
      /*type: Object*/ type: String,
      required: true,
    },
    proName: { type: String, trim: true, required: true, minlength: 3 },
    proDescription: { type: String, trim: true, required: true, minlength: 5 },
    proCategory: {
      type: String,
      trim: true,
      required: true,
      minlength: 2,
      // enum: [],
    },
    proPrice: { type: Number, required: true, min: 1 },
    proImg: { type: String, trim: true, required: true },
    userId: { /*type: Object*/ type: String, required: true },
  },
  { timestamps: true }
);

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;
