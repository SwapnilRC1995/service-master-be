const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const {checkIfAdminSignedIn, checkIfAdminOrCurrenUserSignedIn, checkCurrenUserSignedIn} = require('../controllers/authorizationController');

router.get('/', checkIfAdminSignedIn, userController.getUsers);

router.get('/current', checkCurrenUserSignedIn, userController.getCurrentUser)

router.get('/:_id', checkIfAdminOrCurrenUserSignedIn, userController.getUser);

router.put('/:_id', checkIfAdminOrCurrenUserSignedIn, userController.updateUser);

router.delete('/:_id', checkIfAdminOrCurrenUserSignedIn, userController.deleteUser);

router.post('/', userController.createUser)

module.exports = router;