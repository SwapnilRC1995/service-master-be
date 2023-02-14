const Booking = require('../models/Booking');

exports.getBookings = async (req, res) => {
    return res.json(await Booking.find({}));
}