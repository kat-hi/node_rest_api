const express = require('express');
const PostController = require('./PostController');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));

router.route('/')
    .get(PostController.readPosts)
    .post(PostController.createPost)

router.route('/:id')
    .get(PostController.readPostById)
    .put(PostController.updatePost)
    .delete(PostController.deletePostById)

module.exports = router;
