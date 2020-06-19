const jwt = require('jsonwebtoken')
const config = require('config')
const atob = require('atob')
const userController = require('../api/User/UserController')

function isAuthenticated(request, response, next) {
    console.log('start authentication')
    if (typeof request.headers.authorization !== 'undefined') {
        const token = request.headers.authorization.split(' ')[1];
        const secret = config.get('secrets.secretkey');
        jwt.verify(token, secret, { algorithm: "HS256" }, async (error) => {
            console.log('token verify')
            if (error) {
                return response.status(403).send(json({ error: "Not Authorized" }));
            }
            const payload = JSON.parse(atob(token.split(".")[1]));
            try {
                request.user = await userController.readUserByName(payload.username)
            } catch (error) {
                console.log(error)
            }
            console.log(request.user)
            return next()
        });
    } else {
        return response.status(403).send(json({ error: "Not Authorized" }));
    }
}

function verifyToken (req, res, next) {
    console.log('verify Token')
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader.split(' ')[1]
        console.log('verified token')
        next()
    } else {
        res.status(403).send("Forbidden");
    }
};

// function hasPermission (req, res, next ) {
//     const permission = accessControl.can(req.user.role).readAny(req.param)
// }

module.exports = {
    verifyToken,
    isAuthenticated
}
