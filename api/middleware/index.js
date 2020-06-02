const config = require('./../../config')
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    let token = req.headers['x-access-token'];
    let decoded;
    try {
        decoded = jwt.verify(token, config.secretKey);
    } catch(err) {
        decoded = false;
    };
    !!decoded ?  next() : res.status(500).send('Usuario no autorizado')
};

module.exports = {
    auth: auth
}