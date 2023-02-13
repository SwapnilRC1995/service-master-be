const {body, validationResult} = require("express-validator");
const User = require('../models/user')


exports.createUser = [
    body('first-name').trim().escape().notEmpty().withMessage('Input must not be empty'),
    body('last-name').trim().escape().notEmpty().withMessage('Input must not be empty'),
    body('email').trim().notEmpty().withMessage('Input must not be empty').isEmail().withMessage('Invalid email').normalizeEmail().bail().custom( async email => {
        if (await User.findOne({'email': email}).exec() !== null) throw new Error("Email is already in use");
    }),
    body('password').trim().escape().notEmpty().withMessage('Input must not be empty'),
    body('type').trim().notEmpty().withMessage('Input must not be empty').toUpperCase().isIn(['ADMIN', 'CUSTOMER', 'PROVIDER']).withMessage('Invalid type'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);
        let user = new User({
            first_name: req.body['first-name'],
            last_name: req.body['last-name'],
            email: req.body['email'],
            password: req.body['password'],
            type: req.body['type'],
        });
        return res.json(await user.save())
    }
];
