const jwt = require('jsonwebtoken')
const config = require('config')
const userController = require('../User/UserController')
const secretkey = config.get('secrets.secretkey')

exports.loginhandler = async (req, res) => {
    try {
        const user = JSON.stringify(await userController.readUserByName(req.body.name))
        jwt.sign(user, secretkey, (error, token) => {
            if(error) return res.status(500).send(error.message)
            res.json(token)
        })
    } catch (e) {
        console.log(e.message)
    }
};

