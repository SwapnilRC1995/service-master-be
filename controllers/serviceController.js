const { body, validationResult, param } = require('express-validator');
const mongoose = require('mongoose');
const Service = require('../models/service');

// get all services
exports.getServices = async (req, res) => {
    return res.json(await Service.find({}));
}

// get service by id
exports.getService = [
    param('_id').trim().escape().notEmpty().withMessage('_id must not be empty').custom(async _id => {
        if (!mongoose.Types.ObjectId.isValid(_id)) throw new Error("_id is not valid");
    }),
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    return res.json(await Service.findById(req.params['_id']).exec());
    }
]

// create a new service
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
