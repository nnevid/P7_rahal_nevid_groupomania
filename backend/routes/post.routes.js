const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');
const { requireAuth, checkUser } = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', requireAuth, postCtrl.getAllPosts);
router.post('/',  requireAuth, multer, postCtrl.createPost);
router.put('/:id', requireAuth, multer, postCtrl.modifyPost);
router.delete('/:id', requireAuth, postCtrl.deletePost);
router.get('/:id', requireAuth, postCtrl.getOnePost);

module.exports = router;