const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const {checkIfAdminSignedIn, checkIfAdminOrCurrenUserSignedIn, checkCurrenUserSignedIn} = require('../controllers/authorizationController');

router.get('/customer', checkCurrenUserSignedIn, bookingController.getBookingByCustomerId);

router.get('/', checkIfAdminOrCurrenUserSignedIn, bookingController.getBookings);

router.get('/:_id', checkIfAdminOrCurrenUserSignedIn, bookingController.getBooking);

router.put('/:_id', checkIfAdminSignedIn, bookingController.updateBooking);

router.delete('/:_id', checkIfAdminSignedIn, bookingController.deleteBooking);

router.post('/', checkCurrenUserSignedIn, bookingController.createBooking);

module.exports = router;
