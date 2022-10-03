const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: [true, `S'il vous plaît, renseignez votre pseudo`],
      maxlength: 55,
      minlength: [3, `Votre pseudo doit avoir un minimum de 3 caractères`],
      trim: true,
      unique: [true, `Ce pseudo n'est pas disponible`],
    },
    email: {
      type: String,
      required: [true, `S'il vous plaît, renseignez votre email`],
      unique: [true, `Cet email a déjà été utilisé`],
      lowercase: true,
      validate: [isEmail, `S'il vous plaît, renseignez un email valide`],
    },
    password: {
      type: String,
      required: [true, `S'il vous plaît, renseignez votre mot de passe`],
      minlength: [6, `Le mot de passe doit avoir au minimum 6 caractères`],
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
    }
   //  tokens: [{ type: Object }],
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

// Hashing Passwords
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static method to login user
userSchema.statics.login = async function(email, password) {
  
   const user = await this.findOne({ email });
   if (user) {
    const match = await bcrypt.compare(password, user.password)
    if (match) {
      return user;
      
    }
    throw Error (`Le mot de passe est incorrect`)
   }
   throw Error(`Le email est incorrect`)
} 


module.exports = mongoose.model("User", userSchema);
