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
    .put(UserController.updateUser)
    .delete(UserController.deleteUserById)

router.route('/:id/own-posts')
    .get(UserController.readAllOwnPostsOfUser)

router.route('/:id/starred-posts')
    .get(UserController.readAllStarredPostsOfUser)

//router.route('/post/:id')
//    .get(UserController.readPostsOfUserByID)
//    .put(UserController.updatePostOfUser)


module.exports = router;
