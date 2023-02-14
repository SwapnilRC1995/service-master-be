const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController')
const {checkIfAdminSignedIn} = require("../controllers/authenticationController");

router.get('/', checkIfAdminSignedIn, serviceController.getServices);

router.post('/', checkIfAdminSignedIn, serviceController.createService);


module.exports = router;
