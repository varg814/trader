const { Router } = require("express");
const productModel = require("../models/product.model");
const productRouter = Router();

// GET /products → public → list all products
productRouter.get("/", async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("createdBy", "fullName email")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Failed to fetch products." });
  }
});

// GET /products/:id → public → single product
productRouter.get("/:id", async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("createdBy", "fullName email");

    if (!product) return res.status(404).json({ error: "Product not found." });

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ error: "Failed to fetch product." });
  }
});

// POST /products → protected → create new product
productRouter.post("/", async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const newProduct = await productModel.create({
      title,
      description,
      price,
      createdBy: req.userId,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ error: "Failed to create product." });
  }
});

// PUT /products/:id → protected → update own product
productRouter.put("/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) return res.status(404).json({ error: "Product not found." });

    // Only allow owner to edit
    if (product.createdBy.toString() !== req.userId) {
      return res.status(403).json({ error: "Not authorized." });
    }

    const { title, description, price, imageUrl } = req.body;

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.imageUrl = imageUrl || product.imageUrl;

    await product.save();

    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ error: "Failed to update product." });
  }
});

// DELETE /products/:id → protected → delete own product
productRouter.delete("/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) return res.status(404).json({ error: "Product not found." });

    // Only allow owner to delete
    if (product.createdBy.toString() !== req.userId) {
      return res.status(403).json({ error: "Not authorized." });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted." });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ error: "Failed to delete product." });
  }
});

module.exports = productRouter;
