// UserController.js
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('./UsersModel');

router.get('/', function (req, res) {
    // User.find({}, function (err, users) {
    //     if (err) return res.status(500).send("There was a problem finding the users.");
    //     res.status(200).send(users);
    // });
    return 'hallo i bims der userjson'
});

router.post('/', function (req, res) {
    User.create({
            id : req.body.id,
            name: req.body.name,
            email : req.body.email,
            password : req.body.password,
            own_posts: req.body.own_posts,
            starred_posts: req.body.starred_posts
        },

        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});
// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.name +" was deleted.");
    });
});

module.exports = router;
