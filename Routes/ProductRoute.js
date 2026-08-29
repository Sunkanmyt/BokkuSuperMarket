const express = require("express");
const router = express.Router();

// Importing product related controllers
const productController = require("../Controllers/ProductController");

// To get all products
router.get("/getproducts", productController.getProducts);

// To get a single product by ID
router.get("/getproduct/:id", productController.getProduct);

// To add a new product
router.post("/createproduct", productController.createProduct);

// To update products
router.put("/updateproduct/:id", productController.updateProduct);

// To delete a product
router.delete("/deleteproduct/:id", productController.deleteProduct);

// Export the router to be used in other parts of the application
module.exports = router;
