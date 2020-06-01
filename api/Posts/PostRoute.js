var express = require('express');
var router = express.Router();
var PostController = require('./PostController');
/* GET users listing. */
router.route('/')
    .get(PostController.getPosts)
    .post(PostController.createPost)
    //.delete(PostController.deleteUsers)

router.route('/:id')
    //.get(PostController.getUser)
    //.put(PostController.updateUser)
    //.delete(PostController.deleteUser)

module.exports = router;
