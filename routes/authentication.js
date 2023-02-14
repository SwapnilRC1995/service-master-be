const express = require('express');
const authenticationController = require('../controllers/authenticationController');
const router = express.Router();

router.all('*', authenticationController.verifyToken)

module.exports = router;