const express = require('express');
const router = express.Router();// create a router

const UserController = require('./UserController');

router.post('/register', UserController.register);
module.exports = router;