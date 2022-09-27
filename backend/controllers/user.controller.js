const User = require('../models/User');
const ObjectID = require('mongoose').Types.ObjectId;

//Get all users
exports.getAllUsers = (req, res, next) => {
   User.find().select('-password')
   .then(sauces => res.status(200).json(sauces))
   .catch(error => res.status(400).json({ error: error }))
    
}

// Get one user
exports.getOneUser = (req, res, next) =>{
   if (!ObjectID.isValid(req.params.id))
   return res.status(400).send('Unknown ID' + req.params.id)
   User.findById(req.params.id, (err, docs) => {
      if(!err) res.send(docs);
      else console.log('Unknown ID:' + err);
   }).select('-password')
};

//Update User
exports.updateUser =  (req, res, next) => {
   if (!ObjectID.isValid(req.params.id))
   return res.status(400).send('Unknown ID' + req.params.id)
   else {
   User.findOneAndUpdate(
         {_id: req.params.id},
         {$set: {bio: req.body.bio}},
         {new: true, upsert: true, setDefaultsOnInsert: true})
      .then ((docs) => res.send(docs))
      .catch ((err) => res.status(404).send({ message: err}))
   }
};


