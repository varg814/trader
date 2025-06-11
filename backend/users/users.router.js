const { Router } = require("express");
const userModel = require("../models/user.model");
const productModel = require("../models/product.model");

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await userModel
      .find({}, "fullName email createdAt updatedAt")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

userRouter.delete("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    await productModel.deleteMany({ createdBy: userId });

    const result = await userModel.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "User and their products deleted successfully." });
  } catch (error) {
    console.error("Error deleting user and products:", error.message);
    res.status(500).json({ error: "Failed to delete user and products." });
  }
});

module.exports = userRouter;
