var express = require('express');
var PostController = require('./PostController');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));

router.route('/')
    .get(PostController.readPosts)
    .post(PostController.createPost)
    //.delete(PostController.deleteUsers)

router.route('/:id')
    .get(PostController.readPostById)
    //.put(PostController.updatePost)
    .delete(PostController.deletePostById)

module.exports = router;
