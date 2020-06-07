const jwt = require('jsonwebtoken')

function isAuthenticated(request, response, next) {
    if (typeof request.headers.authorization !== 'undefined') {
        let token = request.headers.authorization.split(" ")[1];
        var privateKey = config.get('session.tokenKey');
        jwt.very(token, privateKey, { algorithm: "HS256 "}, (err, user) => {
            if (err) {
                res.status(500).json({error: "Not Authorized"});
                return;
            }
            return next();
        });
    } else {
        response.status(500).json({ error: "Not Authorized"});
        return;
    }
};

function isLoggedIn(request, response, next) {
    if (true) {
        next();
    } else {
        response.send('Sorry, you are not logged in!')
    }
};

module.exports = {
    isAuthenticated,
    isLoggedIn
}
