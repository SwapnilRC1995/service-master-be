const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BookingSchema = new Schema({
    provider: {type: mongoose.ObjectId},
    customer: {type: mongoose.ObjectId},
    urgency: {type: String},
    booking_postal_code: {type: String},
    booking_description: {type: String},
    booking_address: {type: String},
    booking_date: {type: Date},
    booking_time: {type: Date},
    status: {type: String}
});
module.exports = BookingSchema