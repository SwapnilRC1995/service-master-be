const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const {
  checkIfAdminSignedIn,
  checkIfAdminOrUserSignedIn,
  checkUserSignedIn
} = require('../controllers/authorizationController');

router.get('/customer', checkUserSignedIn, bookingController.getBookingsByCustomerId);

router.get('/provider', checkUserSignedIn, bookingController.getBookingsByProviderId);

router.get('/', checkIfAdminOrUserSignedIn, bookingController.getBookings);

router.get('/:_id', checkIfAdminOrUserSignedIn, bookingController.getBooking);

router.put('/:_id', checkIfAdminSignedIn, bookingController.updateBooking);

router.put('/date/:_id', checkUserSignedIn, bookingController.updateBookingDate);

router.delete('/:_id', checkUserSignedIn, bookingController.deleteBooking);

router.post('/', checkUserSignedIn, bookingController.createBooking);

module.exports = router;
