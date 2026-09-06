const express = require("express");
const router = express.Router();

// Import middelware to authenticate users
const { authenticate } = require("../Middleware/auth");

// Import middleware to authorize users
const { authorize } = require("../Middleware/role");

// Importing image upload middleware
const upload = require("../Middleware/upload");

// Importing product related controllers
const productController = require("../Controllers/ProductController");

// To get all products
router.get(
  "/getproducts",
  authenticate,
  authorize("superadmin", "storekeeper", "salesperson", "user"),
  productController.getProducts,
);

// To get a single product by ID
router.get(
  "/getproduct/:id",
  authenticate,
  authorize("superadmin", "storekeeper", "salesperson"),
  productController.getProduct,
);

// To add a new product
router.post(
  "/createproduct",
  authenticate,
  authorize("superadmin"),
  upload.single("image"),
  productController.createProduct,
);

// To update products
router.put(
  "/updateproduct/:id",
  authenticate,
  authorize("superadmin"),
  upload.single("image"),
  productController.updateProduct,
);

// To delete a product
router.delete(
  "/deleteproduct/:id",
  authenticate,
  authorize("superadmin"),
  productController.deleteProduct,
);

// Export the router to be used in other parts of the application
module.exports = router;
