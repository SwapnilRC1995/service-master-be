const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const {checkIfAdminSignedIn, checkIfAdminOrCurrenUserSignedIn} = require('../controllers/authorizationController');

router.get('/', checkIfAdminOrCurrenUserSignedIn, bookingController.getBookings);

router.get('/:_id', checkIfAdminOrCurrenUserSignedIn, bookingController.getBooking);

router.get('/customer/:_id', checkIfAdminOrCurrenUserSignedIn, bookingController.getBookingByCustomerId);

router.put('/:_id', checkIfAdminSignedIn, bookingController.updateBooking);

router.delete('/:_id', checkIfAdminSignedIn, bookingController.deleteBooking);

router.post('/', checkIfAdminSignedIn, bookingController.createBooking);

module.exports = router;
