const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      maxLength: 55,
      minLength: 3,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [isEmail],
    },
    password: {
      type: String,
      required: true,
      maxLength: 1024,
      minLength: 8,
    },
    picture: {
      type: String,
      default: "./uploads/profil/photo-a-recuperer.png",
    },
    bio: {
      type: String,
      maxLength: 1024,
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
