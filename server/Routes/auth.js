const express = require('express');
const router = express.Router();

const {createUser, loginUser} = require('../controllers/userController');

// register
router.post('/register', createUser);

// login
router.get('/login', loginUser);

module.exports = router; 