const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
const postRoutes = require('./routes/post.routes');
require("dotenv").config({ path: process.cwd() + "/config/.env" });


mongoose
  .connect("mongodb+srv://" + process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("successfully connected to MongoDB! 😁"))
  .catch((err) => console.log("Falied to connecto to MongoDB 😢", err));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use("/api/user", userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;
