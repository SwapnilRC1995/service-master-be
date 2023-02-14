const {body, validationResult, param} = require('express-validator');
const User = require('../models/user');

exports.createUser = [
    body('first-name').trim().escape().notEmpty().withMessage('Input must not be empty'),
    body('last-name').trim().escape().notEmpty().withMessage('Input must not be empty'),
    body('email').trim().notEmpty().withMessage('Input must not be empty').isEmail().withMessage('Invalid email').normalizeEmail().bail().custom( async email => {
        if (await User.findOne({email: email}).exec() !== null) throw new Error('Email is already in use');
    }),
    body('password').trim().notEmpty().withMessage('Input must not be empty'),
    body('type').trim().notEmpty().withMessage('Input must not be empty').toUpperCase().isIn(['ADMIN', 'CUSTOMER', 'PROVIDER']).withMessage('Invalid type'),
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    return res.json(await new User({
        first_name: req.body['first-name'],
        last_name: req.body['last-name'],
        email: req.body['email'],
        password: req.body['password'],
        type: req.body['type']
    }).save());
    }
];

exports.getUsers = async (req, res) => {
    return res.json(await User.find({}));
}

exports.getUser = [
    param('_id').trim().escape().notEmpty().withMessage('_id must not be empty').isMongoId().withMessage('_id is not valid'),
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    return res.json(await User.findById(req.params['_id']).exec());
    }
]

exports.updateUser = [
    param('_id').trim().escape().notEmpty().withMessage('_id must not be empty').isMongoId().withMessage('_id is not valid'),
    body('first-name').trim().escape().notEmpty().withMessage('Input must not be empty'),
    body('last-name').trim().escape().notEmpty().withMessage('Input must not be empty'),
    body('email').trim().notEmpty().withMessage('Input must not be empty').isEmail().withMessage('Invalid email').normalizeEmail().bail().custom( async (email, {req}) => {
        let user = await User.findOne({email: email}).exec()
        if (user !== null) {
            if (user._id.toString() !== req.params['_id']) {
                throw new Error('Email is already in use');
            }
        }
    }),
    body('password').trim().notEmpty().withMessage('Input must not be empty'),
    body('type').trim().notEmpty().withMessage('Input must not be empty').toUpperCase().isIn(['ADMIN', 'CUSTOMER', 'PROVIDER']).withMessage('Invalid type'),
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    return res.json(await User.findByIdAndUpdate(req.params['_id'], {
        first_name: req.body['first-name'],
        last_name: req.body['last-name'],
        email: req.body['email'],
        password: req.body['password'],
        type: req.body['type']
    }, {returnDocument: 'after'}));
    }
]

exports.deleteUser = [
    param('_id').trim().escape().notEmpty().withMessage('_id must not be empty').isMongoId().withMessage('_id is not valid'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);
        return res.json(await User.findByIdAndRemove(req.params['_id']));
    }
]