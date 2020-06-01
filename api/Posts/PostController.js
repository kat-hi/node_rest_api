// postController.js
const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Post = require('./PostModel');

exports.getPosts = function(req, res) {
    console.log('POST GET')
    Post.find(function (err, posts) {
        if (err) return res.status(500).send("There was a problem finding the posts.");
        res.status(200).send(posts);
    });
}
exports.getPost = function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if (err) return res.status(500).send("There was a problem finding the post.");
        if (!post) return res.status(404).send("No post found.");
        res.status(200).send(post);
    });
};

exports.createPost = function(req, res) {
    Post.create({
            id : req.body.id,
            name: req.body.name,
            email : req.body.email,
            password : req.body.password,
            own_posts: req.body.own_posts,
            starred_posts: req.body.starred_posts
        },
        function (err, post) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(post);
        });
}

// router.delete('/:id', function (req, res) {
//     Post.delete({
//             id : req.body.id,
//             name: req.body.name,
//             email : req.body.email,
//             password : req.body.password,
//             own_posts: req.body.own_posts,
//             starred_posts: req.body.starred_posts
//         },
//         function (err, post) {
//             if (err) return res.status(500).send("There was a problem adding the information to the database.");
//             res.status(200).send(post);
//         });
// });
