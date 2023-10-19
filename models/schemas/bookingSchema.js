const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BookingSchema = new Schema({
  urgency: {type: String},
  booking_description: {type: String},
  booking_address: {type: String},
  booking_date: {type: Date},
  provider: {type: mongoose.ObjectId},
  customer: {type: mongoose.ObjectId},
  service: {type: mongoose.ObjectId},
});
module.exports = BookingSchema