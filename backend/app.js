const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
const postRoutes = require('./routes/post.routes');
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser} = require('./middleware/auth');
require("dotenv").config({ path: process.cwd() + "/config/.env" });


app.use(cookieParser());
app.use(express.json());

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

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
   res.status(200).send(res.locals.user.id)
})
app.use("/api/user", userRoutes);
app.use('/api/post', postRoutes);
app.use('./frontend/public/uploads/profil', express.static(path.join(__dirname, './frontend/public/uploads/profil')));
app.use('/images', express.static(path.join(__dirname, './frontend/public/uploads/posts')));
module.exports = app;
