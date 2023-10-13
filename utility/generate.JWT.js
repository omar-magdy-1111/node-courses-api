var jwt = require('jsonwebtoken');

module.exports =  (payload) => {
    const token =  jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '10m' })
    return token
}