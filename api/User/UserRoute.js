var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));

const UserController = require('./UserController');

router.route('/')
    .post(UserController.createUser)
    .get(UserController.readUsers)

router.route('/:id')
    .get(UserController.readUserById)
    .delete(UserController.deleteUserById)
    .put(UserController.updateUser)
    //.delete(UserController.deleteUser)

module.exports = router;
