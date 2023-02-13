const mongoose = require('mongoose')
const ServiceSchema = require('./schemas/serviceSchema')
module.exports = mongoose.model('Service', ServiceSchema)