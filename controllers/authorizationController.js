const jwt = require('jsonwebtoken');
const User = require('../models/user')
const mongoose = require('mongoose');

exports.verifyToken = async (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            const decoded = await jwt.verify(req.headers['authorization'].split(' ')[1], process.env.TOKEN_SECRET);
            if (!decoded.hasOwnProperty('_id')) return res.status(401).send('Invalid token')
            if (!mongoose.Types.ObjectId.isValid(decoded['_id'])) throw new Error('_id is not valid');
            res.locals._id = decoded['_id'];
        } catch (e) {
            res.json(e)
        }
    }
    return next();
};


exports.checkIfAdminSignedIn = async (req, res, next) => {
    if (!res.locals._id) return res.status(401).send('Unauthorized');
    const user = await User.findById(res.locals._id).exec();
    if (user === null) return res.status(401).send('Unauthorized');
    if (user.type !== 'ADMIN') return res.status(401).send('Unauthorized');
    return next();
};

exports.checkIfAdminOrCurrenUserSignedIn = async (req, res, next) => {
    if (!res.locals._id) return res.status(401).send('Unauthorized1');
    const user = await User.findById(res.locals._id).exec();
    if (user === null) return res.status(401).send('Unauthorized2');
    if (user.type !== 'ADMIN') {
        if (req.params['_id'] !== res.locals._id) return res.status(401).send('Unauthorized3');
    }
    return next();
};