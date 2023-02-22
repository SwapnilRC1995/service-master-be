const express = require('express');
const authorizationController = require('../controllers/authorizationController');
const router = express.Router();

router.all('*', authorizationController.verifyToken)

module.exports = router;