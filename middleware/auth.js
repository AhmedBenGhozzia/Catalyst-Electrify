const config = require('config')
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token')

    if (!token) {
        res.status(401).send('No token, access denied');
    } else {
        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'))
            req.user = decoded;
            next();
        } catch (error) {
            res.status(400).send('Token is not valid')
        }
    }
}

module.exports = auth;