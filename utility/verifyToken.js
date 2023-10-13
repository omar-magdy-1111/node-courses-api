const { errHandle } = require("./utility");
const jwt = require('jsonwebtoken');
const verifyToken = async (req, res, next) => {
    const authHeader = await req.headers[ 'Authorization' ] || req.headers[ 'authorization' ];
    if (!authHeader) {
        return res.json(errHandle('Error', 401, 'not token provide'));
    }
    try {
        let token = authHeader.split(' ')[ 1 ];
        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currentUser = currentUser;
        next();
    } catch (err) {
        res.json(errHandle('Error', 401, 'token expired'));

    }

};
module.exports = verifyToken;