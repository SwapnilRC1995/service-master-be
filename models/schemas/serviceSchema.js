const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ServiceSchema = new Schema({
    description: {type: String},
    name: {type: String},
    providers: [{type: mongoose.ObjectId}]
});
module.exports = ServiceSchema