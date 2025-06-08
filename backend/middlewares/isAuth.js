const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authorized. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = payload.userId;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ error: "Not authorized. Invalid token." });
  }
};

module.exports = isAuth;

