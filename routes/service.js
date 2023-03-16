const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController')
const {checkIfAdminSignedIn, checkIfAdminOrCurrenUserSignedIn, checkCurrenUserSignedIn} = require('../controllers/authorizationController');


router.get('/', checkCurrenUserSignedIn, serviceController.getServices);

router.get('/:_id', checkCurrenUserSignedIn, serviceController.getService);

router.put('/:_id', checkIfAdminSignedIn, serviceController.updateService);

router.delete('/:_id', checkIfAdminSignedIn, serviceController.deleteService);

router.post('/', checkIfAdminSignedIn, serviceController.createService);


module.exports = router;
