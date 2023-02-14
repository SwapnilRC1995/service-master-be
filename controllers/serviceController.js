const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Service = require('../models/service');

exports.createService = [
    body('name').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('description').trim().escape().notEmpty().withMessage('Description must not be empty'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        const service = new Service({
            name: req.body['name'],
            description: req.body['description'],
        });
        return res.json(await service.save());
    },
];
