const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const {checkIfAdminSignedIn, checkIfAdminOrCurrenUserSignedIn} = require("../controllers/authenticationController");

router.get('/', checkIfAdminSignedIn, userController.getUsers);

router.get('/:_id', checkIfAdminOrCurrenUserSignedIn, userController.getUser);

router.put('/:_id', checkIfAdminOrCurrenUserSignedIn, userController.updateUser);

router.delete('/:_id', checkIfAdminOrCurrenUserSignedIn, userController.deleteUser);

router.post('/', userController.createUser)

module.exports = router;