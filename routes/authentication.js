const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationControllerController')

router.post('/', authenticationController.getToken);

module.exports = router;