const { json } = require('express');
const passwordValidator = require('password-validator');
var passSchema = new passwordValidator();
passSchema
.is().min(6)
.is().max(10)

module.exports = (req, res, next) => {
   if(passSchema.validate(req.body.password)){
      next();
   }
   else{
      return res.status(400).json({ error: `Le mot de passe doit contenir au moins 6 caractères et au maximum 10`})
   }
}