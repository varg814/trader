const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;  // fallback for local dev
const productRouter = require('./products/products.router');
const userRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router')
const connectToDb = require('./config/connectToDb');
const cors = require('cors');
const isAuth = require("./middlewares/isAuth");


app.use(cors());
app.use(express.json());

connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use('/auth', authRouter)
app.use('/users', isAuth, userRouter);
app.use('/products', isAuth, productRouter);