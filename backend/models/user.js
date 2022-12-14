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
      unique: true,
    },
    email: {
      type: String,
      required: [true, `S'il vous plaît, renseignez votre email`],
      unique: true,
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
      default: "./uploads/profil/Portrait_Placeholder.png",
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
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return user;
    }
    throw Error(`wrong password`);
  }
  throw Error(`email incorrect`);
};

module.exports = mongoose.model("User", userSchema);
