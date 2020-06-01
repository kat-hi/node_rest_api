var express = require('express');
var router = express.Router();
const UserController = require('./UserController');

/* GET users listing. */
router.route('/')
    .post(UserController.createUser)
    .get(UserController.getUsers)
    //.delete(UserController.deleteUsers)

router.route('/:id')
    //.put(UserController.updateUser)
    //.delete(UserController.deleteUser)
    .get(UserController.getUser)

module.exports = router;
