const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController')
const {checkIfAdminSignedIn} = require("../controllers/authenticationController");

router.get('/', (req, res) => {
    res.send('GET SERVICE');
});

router.post('/', checkIfAdminSignedIn, serviceController.createService);

module.exports = router;
