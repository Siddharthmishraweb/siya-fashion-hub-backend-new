const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  phoneNumber: String,
  address: String,
  zipCode: String,
  city: String,
  state: String,
  isMain: Boolean
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, default: null },
  addresses: [addressSchema],
  isVerified: { type: Boolean, default: false },
  picture: { type: String },
  googleId: { type: String, unique: true },
  password: { type: String },
});

const User = mongoose.model('User', userSchema);
module.exports = User;

