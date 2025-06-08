const { Router } = require("express");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRouter = Router();
require("dotenv").config();
const isAuth = require("../middlewares/isAuth");

authRouter.post("/sign-up", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password)
    return res.status(400).json({ error: "field is missing" });

  const existUser = await userModel.findOne({ email: email.toLowerCase() });

  if (existUser) {
    return res.status(400).json({ error: "user already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.create({ fullName, email, password: hashedPassword });
  res.status(201).json({ message: "user created successfully" });
});

authRouter.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "field is missing" });

  const existUser = await userModel
    .findOne({ email: email.toLowerCase() })
    .select("+password");
  if (!existUser) {
    return res.status(400).json({ error: "email or password is incorrect" });
  }

  const isPassEqual = await bcrypt.compare(password, existUser.password);

  if (!isPassEqual) {
    return res.status(400).json({ error: "email or password is incorrect" });
  }

  const payload = {
    userId: existUser._id,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ accessToken });
});

authRouter.get("/current-user", isAuth, async (req, res) => {
  const user = await userModel.findById(req.userId);
  res.json(user);
});

module.exports = authRouter;