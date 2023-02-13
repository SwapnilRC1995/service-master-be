const {body, validationResult} = require("express-validator");
const Service = require('../models/service')
exports.createService = [
    body('name').trim().escape().notEmpty().withMessage('Input must not be empty'),



    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    res.json('Hello miter Mihir')
    new Service({

    });
    }
];