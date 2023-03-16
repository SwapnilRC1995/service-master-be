const { body, validationResult, param } = require('express-validator');
const Booking = require('../models/booking');

exports.getBookings = async (req, res) => {
    return res.json(await Booking.find({}));
}

exports.getBooking = [
    param('_id').trim().escape().notEmpty().withMessage('_id must not be empty').isMongoId().withMessage('_id is not valid'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);
        return res.json(await Booking.findById(req.params['_id']).exec());
    }
]

exports.getBookingByCustomerId = [
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);
        return res.json(await Booking.find({customer: res.locals._id}));
    }
];

exports.createBooking = [
    body('urgency').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('booking_description').trim().escape().notEmpty().withMessage('Description must not be empty'),
    body('booking_address').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('booking_date').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('provider').isMongoId().withMessage('Invalid provider id'),
    body('service').isMongoId().withMessage('Invalid provider id'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        const booking = new Booking({
            urgency: req.body['urgency'],
            booking_description: req.body['booking_description'],
            booking_address: req.body['booking_address'],
            booking_date: req.body['booking_date'],
            provider: req.body['provider'],
            customer: res.locals._id,
            service: req.body['service']
        });
        return res.json(await booking.save());
    },
];

exports.updateBooking = [
    body('urgency').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('booking_description').trim().escape().notEmpty().withMessage('Description must not be empty'),
    body('booking_address').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('booking_date').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('provider').isMongoId().withMessage('Invalid provider id'),
    body('service').isMongoId().withMessage('Invalid provider id'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        const updateParams = {
            urgency: req.body['urgency'],
            booking_description: req.body['booking_description'],
            booking_postal_code: req.body['booking_postal_code'],
            booking_address: req.body['booking_address'],
            booking_date: req.body['booking_date'],
            provider: req.body['provider'],
            customer: res.locals._id,
            service: req.body['service']
        };
        return res.json(await Booking.findByIdAndUpdate(req.params._id, updateParams, { returnDocument: 'after' }));
    },
];

exports.deleteBooking = [
    param('_id').trim().escape().notEmpty().withMessage('_id must not be empty').isMongoId().withMessage('_id is not valid'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);
        return res.json(await Booking.findByIdAndRemove(req.params['_id']));
    }
]