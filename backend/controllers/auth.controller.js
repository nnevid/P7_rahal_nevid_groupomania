const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {handleErrors} = require('../utils/errorHandler')
require("dotenv").config({ path: process.cwd() + "/config/.env" });








const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge });
};

// Sign Up
exports.signUp = async (req, res) => {
  const { email, password, pseudo } = req.body;
  try {
    const user = await User.create({ email, password, pseudo });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json(user._id);
  } catch (err) {
    const errors = handleErrors(err);
   //  console.log(errors);
    res.status(200).json({ errors });
  }
};

// Log In 

exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id})
  } catch (err){
    const errors = handleErrors(err);
      res.status(200).json({errors});
  }
};

// Log Out  
exports.logOut = (req, res) => {
res.cookie('jwt', '', {maxAge: 1});
// return res.json({
//    success: true,
//    message: `Déconnexion réussie`
// })
res.redirect('/profil');

};


