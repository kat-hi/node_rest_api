const Post = require('./PostModel');
const AccessControl = require('accesscontrol');
const access = require('../../middleware/roles')
const roles = access.ac()

exports.readPosts = function(request, response) {
    const permission = roles.can(request.user.get('role')).readAny('post')
    if (permission.granted) {
        Post.find(function (error, posts) {
            if (error) return response.status(500).send("There was a problem finding the posts.");
            response.status(200).send(posts);
        });
    } else {
        response.status(403).send("Forbidden")
    }
}

exports.readPostById = function(request, response) {
    const permission = roles.can(request.user.get('role')).readAny('post')
    if (permission.granted ) {
        Post.findById(request.params.id, function (error, post) {
            if (error) return response.status(500).send("There was a problem finding the post.");
            if (!post) return response.status(404).send("No post found.");
            response.status(200).send(post);
        });
    } else {
        response.status(403).send("Forbidden")
    }
};

exports.createPost = function(request, response) {
    const permission = roles.can(request.user.get('role')).createOwn('post')
    if (permission.granted) {
        Post.create({
                name: request.body.name,
                email : request.body.email,
                password : request.body.password,
                own_posts: request.body.own_posts,
                starred_posts: request.body.starred_posts
            },
            function (error, post) {
                if (error) return response.status(500).send("There was a problem adding the information to the database.");
                response.status(200).send(post);
            });
    } else {
        response.status(403).send("Forbidden")
    }
};

exports.deletePostById = function (request, response) {
    const permission = roles.can(request.user.get('role')).deleteOwn('post')
    if (permission.granted) {
        Post.findByIdAndRemove(request.params.id, function (error, post) {
            if (error) return response.status(500).send("There was a problem deleting the post.");
            response.status(200).send("Post "+ post.name +" was deleted.");
        });
    } else {
        response.status(403).send("Forbidden")
    }
}

exports.updatePost = (req, res) => {
    const permission = roles.can(request.user.get('role')).updateOwn('post')
    if (permission.granted) {
        Post.findOneAndUpdate({_id : req.params.id} ,{ "$set": req.body }, { returnNewDocument: true }, (error, document) => {
            if (error) return res.status(500).send("There was a problem updating the post.")
            res.status(200).send(document)
        })
    } else {
        response.status(403).send("Forbidden")
    }
}

// query methods to call
exports.readPostByCategory = async category => {
    await Post.find({ "category" : category }, function (error, post) {
        if (error) return "There was a problem finding the post."
        if (!post) return "No post found."
        return post
    })
}
