const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
const User = require('../models/user');

exports.getToken = [
    body('email').trim().notEmpty().withMessage('Input must not be empty').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password').trim().notEmpty().withMessage('Input must not be empty'),
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    let user = await User.findOne({email: req.body['email']}).exec();
    if (user === null) return res.send('Email does not associate with any user');
    if (req.body['password'] !== user.password) return res.send('Incorrect credential');
    return res.json(await jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, { expiresIn: '1y' }));
    }
];