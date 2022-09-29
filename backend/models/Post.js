const mongoose = require("mongoose");


const postSchema = mongoose.Schema(
   {
   
   userId: { type: String, required: true },   
   userName: {type: String, required: true},
   content: { type: String},
   imageUrl: { type: String },
   likes: { type: Number, default: 0 },
   usersLiked: { type: [String] },
   
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