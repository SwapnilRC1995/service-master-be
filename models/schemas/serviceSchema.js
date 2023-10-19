const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ServiceSchema = new Schema({
  name: {type: String},
  description: {type: String},
  providers: [{type: mongoose.ObjectId}]
});
module.exports = ServiceSchema