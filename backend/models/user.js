const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');





const userSchema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: [true, `S'il vous plaît, renseignez votre pseudo`],
      maxlength: 55,
      minlength: [3, `Votre pseudo doit avoir un minimum de 3 caractères`],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, `S'il vous plaît, renseignez votre email`],
      unique: [true, `Cet email a déjà été utilisé`],
      lowercase: true,
      validate: [isEmail, `S'il vous plaît, renseignez un email valide`]
    },
    password: {
      type: String,
      required: [true, `S'il vous plaît, renseignez votre mot de passe`],
      minlength: 6,
     
     
    },
    picture: {
      type: String,
      default: "./uploads/profil/photo-a-recuperer.png",
    },
    bio: {
      type: String,
      maxLength: 1024,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    tokens: [{type: Object}]
   
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
