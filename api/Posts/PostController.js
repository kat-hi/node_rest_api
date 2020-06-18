const Post = require('./PostModel');

exports.readPosts = function(request, response) {
    console.log('POST GET')
    Post.find(function (error, posts) {
        if (error) return response.status(500).send("There was a problem finding the posts.");
        response.status(200).send(posts);
    });
}
exports.readPostById = function(request, response) {
    Post.findById(request.params.id, function(error, post) {
        if (error) return response.status(500).send("There was a problem finding the post.");
        if (!post) return response.status(404).send("No post found.");
        response.status(200).send(post);
    });
};

exports.createPost = function(request, response) {
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
};

exports.deletePostById = function (request, response) {
    Post.findByIdAndRemove(request.params.id, function (error, post) {
        if (error) return response.status(500).send("There was a problem deleting the post.");
        response.status(200).send("Post "+ post.name +" was deleted.");
    });
}

exports.updatePost = (req, res) => {
    Post.findOneAndUpdate({_id : req.params.id} ,{ "$set": req.body }, { returnNewDocument: true }, (error, document) => {
        if (error) return res.status(500).send("There was a problem updating the post.")
        res.status(200).send(document)
    })
}

// query methods to call
exports.readPostByCategory = async category => {
    await Post.find({ "category" : category }, function (error, post) {
        if (error) return "There was a problem finding the post."
        if (!post) return "No post found."
        return post
    })
}
