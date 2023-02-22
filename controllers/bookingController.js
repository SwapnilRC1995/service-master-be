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
    param('customer_id').trim().escape().notEmpty().withMessage('_id must not be empty').isMongoId().withMessage('_id is not valid'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);
        return res.json(await Booking.find({customer: body.params['customer_id']}));
    }
];

exports.createBooking = [
    body('booking_postal_code').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('booking_address').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('booking_date').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('booking_time').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('urgency').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('booking_description').trim().escape().notEmpty().withMessage('Description must not be empty'),
    body('status').trim().escape().notEmpty().withMessage('Description must not be empty'),
    body('provider').isMongoId().withMessage('Invalid provider id'),
    body('customer').isMongoId().withMessage('Invalid customer id'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        const booking = new Booking({
            booking_postal_code: req.body['booking_postal_code'],
            booking_address: req.body['booking_address'],
            booking_date: req.body['booking_date'],
            booking_time: req.body['booking_time'],
            urgency: req.body['urgency'],
            booking_description: req.body['booking_description'],
            provider: req.body['provider'],
            customer: req.body['customer'],
        });
        return res.json(await booking.save());
    },
];

exports.updateBooking = [
    body('booking_postal_code').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('booking_address').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('booking_date').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('booking_time').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('urgency').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('booking_description').trim().escape().notEmpty().withMessage('Description must not be empty'),
    body('status').trim().escape().notEmpty().withMessage('Description must not be empty'),
    body('provider').isMongoId().withMessage('Invalid provider id'),
    body('customer').isMongoId().withMessage('Invalid provider id'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        const updateParams = {
            booking_postal_code: req.body['booking_postal_code'],
            booking_address: req.body['booking_address'],
            booking_date: req.body['booking_date'],
            booking_time: req.body['booking_time'],
            urgency: req.body['urgency'],
            booking_description: req.body['booking_description'],
            provider: req.body['provider'],
            customer: req.body['customer'],
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