const mongoose = require('mongoose');
const moment = require('moment');

const orderItemSchema = new mongoose.Schema({
  skuId: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variantId: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const addressSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  phoneNumber: String,
  address: String,
  zipCode: String,
  city: String,
  state: String,
});

const orderSchema = new mongoose.Schema({
  createdAt: { type: Date, default: moment().toDate() },
  items: [orderItemSchema],
  email: { type: String, required: true },
  shippingAddress: { type: addressSchema, required: true },
  shippingOption: { type: String, required: true },
  shippingCost: { type: Number, required: true },
  paymentInfo: { type: Object, required: true },
  billingAddress: { type: addressSchema, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
