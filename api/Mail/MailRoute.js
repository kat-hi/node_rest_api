const nodemailer = require("nodemailer");
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mailController = require('./MailController');

router.use(bodyParser.urlencoded({extended: true}));

router.route('/').post()

module.exports = router;
