const User = require("../models/User");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const {uploadError} = require('../utils/errorHandler');
const multer = require('multer');
//Get all users
exports.getAllUsers = (req, res, next) => {
  User.find()
    .select('-password')
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error: error }));
};

// Get one user
exports.getOneUser = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknown ID" + req.params.id);
  User.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Unknown ID:" + err);
  }).select("-password");
};

//Update User
exports.updateUser = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknown ID" + req.params.id);
  else {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { bio: req.body.bio } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(404).send({ message: err }));
  }
};

exports.deleteUser = (req, res, next) => {
   if (!ObjectID.isValid(req.params.id))
   return res.status(400).send("Unknown ID" + req.params.id);
   else{
      User.deleteOne({_id: req.params.id})
      .then(() => res.status(200).json({message: 'User deleted!'}))
      .catch((err) => res.status(404).send({ message: err }));
   }
}


exports.uploadProfile = async (req, res) => {
   try{
      
      if(
         req.file.detectedMimeType != 'image/jpg' && 
         req.file.detectedMimeType != 'image/jpeg' && 
         req.file.detectedMimeType != 'image/png'
         )
         throw Error ('fichier invalide')
      if(req.file.size> 50000)
      throw Error (`max size`)
      const fileName = req.body.name + '.jpg';
 
 await pipeline(
   req.file.stream,
   fs.createWriteStream(
      `${_dirname}/../frontend/public/uploads/profil${fileName}`
   )
 )
 return res.status(201).json({message: 'Téléchargement réussi!'})
   }
 catch (err){
   const errors = uploadError(err)
   return res.status(400).json({errors});
 }
 
}