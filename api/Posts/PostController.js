// UserController.js
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Post = require('./PostModel');

router.get('/', function (req, res) {
    Post.find({}, function (err, posts) {
        if (err) return res.status(500).send("There was a problem finding the posts.");
        res.status(200).send(posts);
    });
});

router.post('/', function (req, res) {
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
});

router.put('/', function (req, res) {
    Post.update({
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
});
router.delete('/', function (req, res) {
    Post.delete({
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
});

module.exports = router;
