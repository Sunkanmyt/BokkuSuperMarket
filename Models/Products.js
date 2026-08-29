const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
