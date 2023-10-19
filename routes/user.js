const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const {
  checkIfAdminSignedIn,
  checkIfAdminOrUserSignedIn,
  checkUserSignedIn
} = require('../controllers/authorizationController');

router.get('/', checkIfAdminSignedIn, userController.getUsers);

router.get('/current', checkUserSignedIn, userController.getCurrentUser)

router.get('/name/:_id', checkUserSignedIn, userController.getName)

router.get('/:_id', checkIfAdminOrUserSignedIn, userController.getUser);

router.put('/:_id', checkIfAdminOrUserSignedIn, userController.updateUser);

router.delete('/:_id', checkIfAdminOrUserSignedIn, userController.deleteUser);

router.post('/', userController.createUser)

module.exports = router;