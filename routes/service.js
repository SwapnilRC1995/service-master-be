const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController')
const {checkIfAdminSignedIn, checkIfAdminOrCurrenUserSignedIn} = require("../controllers/authenticationController");


router.get('/', checkIfAdminOrCurrenUserSignedIn, serviceController.getServices);

router.get('/:_id', checkIfAdminOrCurrenUserSignedIn, serviceController.getService);

router.post('/', checkIfAdminSignedIn, serviceController.createService);


module.exports = router;
