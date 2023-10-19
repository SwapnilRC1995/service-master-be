const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  first_name: {type: String},
  last_name: {type: String},
  email: {type: String},
  password: {type: String},
  type: {type: String}
});
module.exports = UserSchema