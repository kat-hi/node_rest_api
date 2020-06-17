// UserController.js
const express = require('express');

const User = require('./UsersModel');

exports.readUsers = (req, res) => {
    User.find(function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
};
exports.readUserById = (req, res) => {
    User.findById(req.params.id, function(err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
};

exports.createUser = (req, res) => {
    console.log('USER POST')
    console.log(req.body)
    console.log('test')
    User.create({
            id : req.body.id,
            name: req.body.name,
            email : req.body.email,
            password : req.body.password,
            own_posts: req.body.own_posts,
            starred_posts: req.body.starred_posts
        },
        function(err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database." + err );
            res.status(200).send(user);
        });
};
exports.deleteUserById = (req, res) => {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User " + user.name + " was deleted.");
    });
}

exports.updateUser = function (req, res) {
    User.findOneAndUpdate({_id : req.params.id} ,{ "$set": req.body }, { returnNewDocument: true }, (error, document) => {
        if (error) return res.status(500).send("There was a problem updating the user.")
        console.log(document)
        res.status(200).send(document)
    })
}
