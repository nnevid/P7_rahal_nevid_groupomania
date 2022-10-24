const Post = require("../models/Post");
const User = require("../models/User");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");

// Get all Posts
exports.getAllPosts = (req, res, next) => {
  Post.find()
   //  .select("-userId")
   //  .select("-_id")
    .sort({ createdAt: -1 })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error: error }));
};

// Create Post
exports.createPost = (req, res) => {
  const postObject = req.body;
  console.log(req.file);
  delete postObject._id;
  delete postObject._userId;
  const post = new Post({
    ...postObject,
     imageUrl: `./uploads/posts/${
       req.file.filename
     }`,
  });
  post
    .save()
    .then(() => res.status(201).json({ post }))
    .catch((error) => res.status(400).json({ error }));
};

// Modify Post
exports.modifyPost = (req, res) => {
  const thingPost = req.file
    ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `./uploads/posts/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  delete thingPost._userId;
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      User.findOne({ _id: req.auth.userId })
        .then((user) => {
          console.log(user);
          console.log(user.isAdmin);
          if (post.userId != req.auth.userId && !user.isAdmin === true) {
            res.status(403).json({ message: "403, Not authorized" });
          } else {
            Post.updateOne(
              { _id: req.params.id },
              { ...thingPost, _id: req.params.id }
            )
              .then(() =>
                res.status(200).json({
                  message: "Votre publication a été modifié !",
                  thingPost,
                })
              )
              .catch((error) => res.status(401).json({ error }));
          }
        })
        .catch((error) => res.status(401).json({ error }));
    })

    .catch((error) => res.status(400).json({ error }));
};

// Delete Post
exports.deletePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      User.findOne({ _id: req.auth.userId })
        .then((user) => {
          if (post.userId != user._id && !user.isAdmin === true) {
            res.status(401).json({
              message:
                "401, Vous n'êtes pas authorisé à supprimer cette publication",
            });
          } else {
            const filename = post.imageUrl.split("./uploads/posts/")[1];

            fs.unlink(`./uploads/posts/${filename}`, () => {
              Post.deleteOne({ _id: req.params.id })
                .then(() =>
                  res.status(200).json({ message: "Publication supprimée" })
                )
                .catch((error) => res.status(401).json({ error }));
            });
          }
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Get one post
exports.getOnePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error: error }));
};

// Like and unlike Post
exports.likePost = (req, res) => { 
   const postId = req.params.id;
  const userId = req.body.userId;
  const like = req.body.like;

  if (like === 1) {
    Post.findByIdAndUpdate(
      { _id: postId },
      {
        $inc: { likes: like },
        $push: { usersLiked: userId },
      }
    )
      .then((post) => res.status(200).json(post)
      )
      .catch((error) => res.status(500).json(error.message ));
   }

}
  
   
exports.unLikePost = (req, res) => {
   const postId = req.params.id;
   const userId = req.body.userId;
   // const like = req.body.like;
   Post.findOne({ _id: postId })
   .then((post) => {
      if (post.usersLiked.includes(userId)) {
        Post.findByIdAndUpdate(
          { _id: postId },
          {
            $pull: { usersLiked: userId },
            $inc: { likes: -1 },
          },
          {new : true}
        )
          .then((post) => {
            res
              .status(200)
              .json(post);
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(401).json({ error: message })); 
 }


//   } else {
//     Post.findOne({ _id: postId })
//       .then((post) => {
//         if (post.usersLiked.includes(userId)) {
//           Post.findByIdAndUpdate(
//             { _id: postId },
//             {
//               $pull: { usersLiked: userId },
//               $inc: { likes: -1 },
//             }
//           )
//             .then((post) => {
//               res
//                 .status(200)
//                 .json({ message: "Je n'aime plus cette publication!" + {post} });
//             })
//             .catch((error) => res.status(500).json({ error }));
//         }
//       })
//       .catch((error) => res.status(401).json({ error }));
//   }
// };

exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id inconnu:" + req.params.id);
  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
exports.editComment = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id inconnu:" + req.params.id);
  try {
    return Post.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );
      if (!theComment)
        return res.status(404).send("Ce commentaire n'a pas été trouvé");
      theComment.text = req.body.text;
      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
exports.deleteComment = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id inconnu:" + req.params.id);
  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send({message: 'commentaire supprimé!', docs});
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
