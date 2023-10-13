const {  errHandle } = require("./utility");

const allowedTo = (...roles) => {
    return async (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
           return res.status(401).json(errHandle('failed', `this is allowed to ${roles} only`))
        }
        next()
    }
    
};

module.exports = allowedTo