const { body, validationResult, param } = require('express-validator');
const Service = require('../models/service');

// get all services
exports.getServices = async (req, res) => {
    return res.json(await Service.find({}));
}

// get service by id
exports.getService = [
    param('_id').trim().escape().notEmpty().withMessage('_id must not be empty').isMongoId().withMessage('_id is not valid'),
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
    body('providers').optional().isArray({ min: 1 }).withMessage('Providers must be a non-empty array'),
    body('providers.*').optional().isMongoId().withMessage('Invalid provider id'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        const service = new Service({
            name: req.body['name'],
            description: req.body['description'],
        });
        if (req.body['providers']) {
            service.providers = req.body['providers'];
        }
        return res.json(await service.save());
    },
];


// update a service by id
exports.updateService = [
    param('_id').trim().escape().notEmpty().withMessage('_id must not be empty').isMongoId().withMessage('_id is not valid'),
    body('name').trim().escape().notEmpty().withMessage('Name must not be empty'),
    body('description').trim().escape().notEmpty().withMessage('Description must not be empty'),
    body('providers').optional({ checkFalsy: true }).isArray().withMessage('Providers must be a non-empty array'),
    body('providers.*').optional({ checkFalsy: true }).isMongoId().withMessage('Invalid provider id'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);
        const updateParams = {
            name: req.body['name'],
            description: req.body['description'],
        };
        if (req.body['providers']) {
            updateParams.providers = req.body['providers'];
        }
        return res.json(await Service.findByIdAndUpdate(req.params._id, updateParams, { returnDocument: 'after' }));
    }
]


// delete a service by id
exports.deleteService = [
    param('_id').trim().escape().notEmpty().withMessage('_id must not be empty').isMongoId().withMessage('_id is not valid'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);
        return res.json(await Service.findByIdAndRemove(req.params['_id']));
    }
]
