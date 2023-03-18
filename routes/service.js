const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController')
const {checkIfAdminSignedIn, checkIfAdminOrUserSignedIn, checkUserSignedIn} = require('../controllers/authorizationController');


router.get('/', checkUserSignedIn, serviceController.getServices);

router.get('/:_id', checkUserSignedIn, serviceController.getService);

router.put('/:_id', checkIfAdminSignedIn, serviceController.updateService);

router.delete('/:_id', checkIfAdminSignedIn, serviceController.deleteService);

router.post('/', checkIfAdminSignedIn, serviceController.createService);


module.exports = router;
