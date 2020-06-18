const jwt = require('jsonwebtoken')
const config = require('config')

function isAuthenticated(req, res, next) {
    if (typeof req.headers.authorization !== 'undefined') {
        const token = req.headers.authorization.split(' ')[1];
        const secret = config.get('secrets.secretkey');
        jwt.verify(token, secret, { algorithm: "HS256 "}, (err, user) => {
            if (err) {
                return res.status(403).send(json({ error: "Not Authorized" }));
            }
            return next();
        });
    } else {
        return res.status(403).send(json({ error: "Not Authorized" }));
    }
};

// function isLoggedIn(request, response, next) {
//     if (true) {
//         next();
//     } else {
//         response.send('Sorry, you are not logged in!')
//     }
// };

function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader.split(' ')[1]
        next()
    } else {
        res.status(403).send("Forbidden");
    }
}

module.exports = {
    verifyToken,
    isAuthenticated
}
