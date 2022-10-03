const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');
const { requireAuth, checkUser} = require('../middleware/auth');
// const password = require('../middleware/password'); 
// - de-comment these lines in case you want to use this middleware and add it in the require route
const multer = require('../middleware/multer-config');

// Routes to signup and CRUD users


router.post('/signup',  authCtrl.signUp);
router.post('/login', authCtrl.logIn);
router.get('/logout',  authCtrl.logOut);


router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);



module.exports = router;