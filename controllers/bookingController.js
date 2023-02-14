const Booking = require('../models/booking');

exports.getBookings = async (req, res) => {
    return res.json(await Booking.find({}));
}