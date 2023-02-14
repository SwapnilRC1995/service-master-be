const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BookingSchema = new Schema({
    provider: {type: mongoose.ObjectId},
    customer: {type: mongoose.ObjectId},
    status: {type: String}
});
module.exports = BookingSchema