const Post = require("../models/Post");
const fs = require("fs");

// Get all Posts
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error: error }));
};

// Get one post
exports.getOnePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error: error }));
};

// Create Post
exports.createPost = (req, res) => {
  const postObject = req.body;
  console.log("req.body", req.body);
  delete postObject._id;
  delete postObject._userId;
  const post = new Post({
    ...postObject,
   //  imageUrl: `${req.protocol}://${req.get("host")}/images/${
   //    req.file.filename
   //  }`,
  });
  post
    .save()
    .then(() =>
      res.status(201).json({ message: "Publication bien enregistré !" })
    )
    .catch((error) => res.status(400).json({ error }));
};

// Modify Post
exports.modifyPost = (req, res) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  delete postObject._userId;
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post._userId != req.auth._userId) {
        res
          .status(403)
          .json({ message: "403, Not authorized to modify/delete this post" });
      } else {
        Post.updateOne(
          { _id: req.params.id },
          { ...thingPost, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Post modified" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(401).json({ error });
    });
};

// Delete Post
exports.deletePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res
          .status(401)
          .json({ message: "401, Not authorized to modify/delete this post" });
      } else {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Post deleted!" }))
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
