const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');
const { requireAuth, checkUser} = require('../middleware/auth');
// const password = require('../middleware/password'); 
// - de-comment these lines in case you want to use this middleware and add it in the require route
const multerProfile = require('../middleware/multer-profile');


// Routes to signup login and logout
router.post('/signup',  authCtrl.signUp);
router.post('/login', authCtrl.logIn);
router.get('/logout',  authCtrl.logOut);

// Routes to CRUD Users
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

// Upload route for user profile picture
router.post('/upload',  multerProfile, userCtrl.uploadProfile)



module.exports = router;