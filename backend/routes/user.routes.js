const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes to signup and CRUD users


router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);



module.exports = router;