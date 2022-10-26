const mongoose = require("mongoose");
const ObjectID = require("mongoose").Types.ObjectId;

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    content: { type: String },
    imageUrl: { type: String },
   //  likes: { type: Number, default: 0 },
    usersLiked: { type: [String], required: true },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);

// userName: {

//    type: mongoose.Schema.Types.ObjectId,
//    ref: "User",
//  },
