const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');
const { requireAuth, checkUser } = require('../middleware/auth');
const multer = require('../middleware/multer-posts');

// CRUD routes for posts
router.get('/', requireAuth, postCtrl.getAllPosts);
router.post('/',  requireAuth, multer, postCtrl.createPost);
router.put('/:id', requireAuth, multer, postCtrl.modifyPost);
router.delete('/:id', requireAuth, postCtrl.deletePost);
router.get('/:id', requireAuth, postCtrl.getOnePost);
router.post('/like/:id', requireAuth, postCtrl.likePost);

// comments pas activés pour l'instant
router.patch('/comment/:id', requireAuth, postCtrl.commentPost);
router.patch('/edit-comment/:id', requireAuth, postCtrl.editComment);
router.patch('/delete-comment/:id', requireAuth, postCtrl.deleteComment);

module.exports = router;