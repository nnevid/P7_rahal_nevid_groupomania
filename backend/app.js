const express = require('express');
const path = require('path');
const app = express();
const userRoutes = require('./routes/user.routes');
require('dotenv').config({ path: process.cwd() + '/config/.env' })

app.use(express.json());


const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://"+ process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
      
    }
  )
  .then(() => console.log("connection à Mongo DB réussie!"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });


 app.use('api/user', userRoutes);

 module.exports = app;