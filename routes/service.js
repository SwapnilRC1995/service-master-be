const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController')
const {checkIfAdminSignedIn, checkUserSignedIn} = require('../controllers/authorizationController');

router.get('/', checkIfAdminSignedIn, serviceController.getServices);

router.get('/customer', checkUserSignedIn, serviceController.getAvailableServices);

router.get('/provider', checkUserSignedIn, serviceController.getServicesOfProvider);

router.get('/provider/registered', checkUserSignedIn, serviceController.getRegisteredServicesOfProvider);

router.get('/:_id', checkUserSignedIn, serviceController.getService);

router.put('/provider/:_id', checkUserSignedIn, serviceController.addProvider);

router.delete('/provider/:_id', checkUserSignedIn, serviceController.deleteProvider);

router.put('/:_id', checkIfAdminSignedIn, serviceController.updateService);

router.delete('/:_id', checkIfAdminSignedIn, serviceController.deleteService);

router.post('/', checkIfAdminSignedIn, serviceController.createService);

module.exports = router;
