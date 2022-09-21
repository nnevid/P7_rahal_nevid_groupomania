const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');

// Signup
router.post('/signup', authCtrl.signup);

//Get all users
router.get('/', userCtrl.getAllUsers)



module.exports = router;