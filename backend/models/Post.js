const mongoose = require("mongoose");


const postSchema = mongoose.Schema(
   {
   
   userId: { type: String, required: true },   
   pseudo: {type: String, required: true},
   content: { type: String},
   imageUrl: { type: String },
   likes: { type: Number, default: 0 },
   usersLiked: { type: [String] },
   comments: {
      type: [
         {
            commenterId: String,
            commenterPseudo: String,
            text: String,
            timestamp: Number,
         }
      ],
      require: true,
   }
   },

   {
      timestamps: true,
    }
)


module.exports = mongoose.model('Post', postSchema);



// userName: {
      
//    type: mongoose.Schema.Types.ObjectId,
//    ref: "User",
//  },