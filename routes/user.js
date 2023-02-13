const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const {checkIfAdminSignedIn} = require("../controllers/authenticationController");

router.get('/', checkIfAdminSignedIn, userController.getUsers);

router.post('/', userController.createUser)

module.exports = router;