const User = require('./UsersModel');
const access = require('../../middleware/roles')
const roles = access.ac()

exports.readUsers = (request, response) => {
    const permission = roles.can(request.user.get('role')).readAny('user')
    if (permission.granted) {
        User.find((err, users) => {
            if (err) return response.status(500).send("There was a problem finding the users.");
            response.status(200).send(users);
        });
    } else {
        response.status(403).send("Forbidden")
    }
};

exports.readUserById = (request, response) => {
    const permission = roles.can(request.user.get('role')).readAny('user')
    if (permission.granted) {
        User.findById(request.params.id, (err, user) => {
            if (err) return response.status(500).send("There was a problem finding the user.");
            if (!user) return response.status(404).send("No user found.");
            response.status(200).send(user);
        });
    } else {
        response.status(403).send("Forbidden")
    }
};

exports.createUser = async (request, response) => {
    const permission = roles.can(request.user.get('role')).createAny('user')
    if (permission.granted) {
        const user = new User({
            id : request.body.id,
            name: request.body.name,
            email : request.body.email,
            password : request.body.password,
            own_posts: request.body.own_posts,
            starred_posts: request.body.starred_posts
        })
        try {
            response.status(200).send(user);
            return await user.save()
        } catch (e) {
            console.log(e.message)
        }
    } else {
        response.status(403).send("Forbidden")
    }

};

exports.deleteUserById = (request, response) => {
    const permission = roles.can(request.user.get('role')).deleteAny('user')
    if (permission.granted) {
        User.findByIdAndRemove(request.params.id, (err, user) => {
            if (err) return response.status(500).send("There was a problem deleting the user. " + err);
            response.status(200).send("User " + user.name + " was deleted.");
        });
    } else {
        response.status(403).send("Forbidden")
    }

}

exports.updateUser = function (request, response) {
    const permission = roles.can(request.user.get('role')).updateAny('user')
    if (permission.granted) {
        User.findOneAndUpdate({_id : request.params.id} ,{ "$set": request.body }, { returnNewDocument: true }, (error, document) => {
            if (error) return response.status(500).send("There was a problem updating the user.")
            console.log(document)
            response.status(200).send(document)
        })
    } else {
        response.status(403).send("Forbidden")
    }
}

exports.readAllOwnPostsOfUser = function (request, response) {
    const permission = roles.can(request.user.get('role')).readOwn('user')
    if (permission.granted) {
        User.find({"_id": request.params.id }, 'own_posts', (err, posts, next) => {
            if (err) return response.status(500).send("There was a problem finding post of the user: " + err)
            if (!posts) return response.status(200).send("There are no posts yet")
            response.status(200).send(posts)
        })
    } else {
        response.status(403).send("Forbidden")
    }

}

exports.readAllStarredPostsOfUser = function (request, response) {
    const permission = roles.can(request.user.get('role')).readOwn('user')
    if (permission.granted) {
        User.find({"_id": request.params.id }, 'starred_posts', (err, posts, next) => {
            if (err) return response.status(500).send("There was a problem finding post of the user: " + err)
            if (!posts) return response.status(200).send("There are no posts yet")
            response.status(200).send(posts)
        })
    } else {
        response.status(403).send("Forbidden")
    }
}

// query methods to call
exports.readUserByName = async username => {
    return User.findOne({ "name": username });
}

