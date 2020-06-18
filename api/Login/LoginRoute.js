const express = require('express');
const router = express.Router();
const LoginController = require('./LoginController');

router.route('/')
     .get(LoginController.loginhandler)

module.exports = router;
