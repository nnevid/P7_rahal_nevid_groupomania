const jwt = require('jsonwebtoken')
require('dotenv').config({ path: process.cwd() + '/.env' })
const User = require("../models/User");

// Verify authorization with JWT
const requireAuth = (req, res, next) => {
   const token = req.cookies.jwt
    if(token){
      jwt.verify(token, `${process.env.SECRET_KEY}`, async (err, decodedToken) => {
         const userId = decodedToken.id
         if(err) {
            console.log(err.message);
            res.redirect('/login');
         }else{
            console.log(userId);
            next();
         }
      })
    
   }else {
      
      res.redirect('/login')
    
   }
}

// Verify User info
const checkUser = (req, res, next) => {
   const token = req.cookies.jwt
   if(token){
      jwt.verify(token, `${process.env.SECRET_KEY}`, async (err, decodedToken) => {
         if(err) {
            res.locals.user = null;
            res.cookie('jwt', '', {maxAge: 1});
            next(); 
         }else{
            let user = await User.findById(decodedToken.id)
            res.locals.user = user;
            next();
         }
      } )
   }else {
      res.locals.user = null;
      next();
   }
}

module.exports = { requireAuth, checkUser };