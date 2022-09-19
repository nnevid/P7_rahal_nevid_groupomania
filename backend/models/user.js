const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
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
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
