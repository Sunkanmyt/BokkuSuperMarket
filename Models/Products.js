const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    size: {
      type: String,
      required: [true, "Product size is required"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      min: [0, "Quantity cannot be negative"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    color: {
      type: String,
      trim: true,
    },
    // Cloudinary upload fields
    imageUrl: {
      type: String,
      required: [true, "Product image URL is required"],
      default: "",
    },
    imagePublicId: {
      type: String,
      required: [true, "Product image public ID is required"],
      default: "",
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
