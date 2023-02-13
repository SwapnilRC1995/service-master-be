const jwt = require('jsonwebtoken');
const User = require('../models/user')

exports.verifyToken = async (req, res, next) => {
    if (req.headers['authorization']) {
        const decoded = await jwt.verify(req.headers['authorization'].split(' ')[1], process.env.TOKEN_SECRET);
        if (!decoded.hasOwnProperty('_id')) return res.send('Invalid token')
        res.locals._id = decoded['_id'];
    }
    return next();
};


exports.checkIfAdminSignedIn = async (req, res, next) => {
    if (!res.locals._id) return res.status(401).send('Unauthorized');
    const user = await User.findOne({_id: res.locals._id}).exec();
    if (user === null) return res.status(401).send('Unauthorized');
    if (user.type !== 'ADMIN') return res.status(401).send('Unauthorized');
    return next();
};