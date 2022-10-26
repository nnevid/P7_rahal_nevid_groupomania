const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');
const { requireAuth, checkUser } = require('../middleware/auth');
const multerPosts = require('../middleware/multer-posts');

// CRUD routes for posts
router.get('/', requireAuth, postCtrl.getAllPosts);
router.post('/',  requireAuth, multerPosts, postCtrl.createPost);
router.put('/:id', requireAuth, multerPosts, postCtrl.modifyPost);
router.delete('/:id', requireAuth, postCtrl.deletePost);
router.get('/:id', requireAuth, postCtrl.getOnePost);
router.patch('/like/:id',  postCtrl.likePost);
router.patch('/unlike/:id',  postCtrl.unLikePost);

// comments pas activés pour l'instant
router.patch('/comment/:id', requireAuth, postCtrl.commentPost);
router.patch('/edit-comment/:id', requireAuth, postCtrl.editComment);
router.patch('/delete-comment/:id', requireAuth, postCtrl.deleteComment);

module.exports = router;