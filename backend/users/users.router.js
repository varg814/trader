const { Router } = require("express");
const userModel = require("../models/user.model");

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await userModel
      .find({}, 'fullName email createdAt updatedAt')
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

module.exports = userRouter;
