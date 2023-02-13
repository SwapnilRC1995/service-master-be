const mongoose = require('mongoose')
const BookingSchema = require('./schemas/bookingSchema')
module.exports = mongoose.model('Booking', BookingSchema)