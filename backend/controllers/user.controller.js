const User = require("../models/User");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { uploadError } = require("../utils/errorHandler");
const multer = require("multer");

//Get all users
exports.getAllUsers = (req, res, next) => {
  User.find()
    .select("-password")
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
// Delete user profile
exports.deleteUser = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknown ID" + req.params.id);
  else {
    User.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "User deleted!" }))
      .catch((err) => res.status(404).send({ message: err }));
  }
};

// Rename user profile picture after upload(needs multer-config middleware).
exports.uploadProfile = async (req, res) => {
  const fileName = req.body.pseudo + ".jpg";
  
  try {
    if (
      req.file.mimetype != "image/jpg" &&
      req.file.mimetype != "image/jpeg" &&
      req.file.mimetype != "image/png"
    )
      throw Error("fichier invalide");
    if (req.file.size > 500000) throw Error(`max size`);
    
   //  return res.status(201).json({ message: "Téléchargement réussi!" });
    
  } catch (err) {
    const errors = uploadError(err);
    return res.status(400).json({ errors });
  }
  
  if (req.file) {
   fs.renameSync(req.file.path, req.file.destination + fileName);
   console.log(fileName);
 }
  
try{await User.findOneAndUpdate(
   req.body.userId,
   { $set: {picture: './uploads/profil/' + fileName}},
   {new: true, upsert:true, setDefaultsOnInsert: true},
     )
   return res.status(201).json({ message: "Téléchargement réussi!" });
  ;}
  catch (err) {
   
   return res.status(400).json({ err });
 }
  
  
};
