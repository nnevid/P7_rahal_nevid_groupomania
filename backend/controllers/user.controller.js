const User = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;


exports.getAllUsers = (req, res, next) => {
   User.find().select('-password')
   .then(sauces => res.status(200).json(sauces))
   .catch(error => res.status(400).json({ error: error }))
    
}
