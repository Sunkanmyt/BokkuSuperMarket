const Product = require("../Models/Products");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products) {
      return res.status(404).json({ message: "No product available" });
    }

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to retrieve products", error: error.message });
  }
};

// Get one products
exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "No product available" });
    }

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to retrieve products", error: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    // Check if all required fields are provided
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.size ||
      !req.body.quantity ||
      !req.body.price
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const { name, description, size, quantity, price, color } = req.body;

    const newProduct = new Product({
      name,
      description,
      size,
      quantity,
      price,
      color,
    });

    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({ message: "Product successfully created", savedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, size, quantity, price, color } = req.body;

    const product = await Product.findByIdAndUpdate(id, {
      name,
      description,
      size,
      quantity,
      price,
      color,
    });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res
      .status(201)
      .json({ message: "Product was successfully updated", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product ", error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product successfully deleted", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};
