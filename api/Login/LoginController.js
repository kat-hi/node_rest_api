const jwt = require('jsonwebtoken')
const config = require('config')
const secretkey = config.get('secrets.secretkey')

exports.loginhandler = async (req, res) => {
    const username = req.body.name
    jwt.sign({ username }, secretkey, { algorithm:'HS256', expiresIn: '60min'}, (error, token) => {
        if(error) return res.status(403).send(error.message)
        console.log('got usertoken')
        res.json(token)
    })
};

