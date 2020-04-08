const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const jwt_token = req.header('authorization');

        if (!jwt_token) return res.status(401).json({ status: 'No token, authorizaton denied' });

        const decoded = jwt.verify(jwt_token, config.get('jwtSecret'));

        req.user = decoded;

        next();
    } catch (e) {
        res.status(401).json({ status: 'Token is not valid' });
    }
}

module.exports = auth;