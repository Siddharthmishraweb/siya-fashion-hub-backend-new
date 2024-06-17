// const mongoose = require('mongoose');

// const cartItemSchema = new mongoose.Schema({
//   skuId: { type: String, required: true },
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   variantId: { type: String, required: true },
//   quantity: { type: Number, required: true },
// });

// const cartSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   items: [cartItemSchema],
// });

// const Cart = mongoose.model('Cart', cartSchema);
// module.exports = Cart;
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  skuId: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  variantId: {
    type: String,
  },
  type: {
    type: String,
  },
  color: {
    type: String,
  },
  price: {
    type: Number
  },
  image: {
    type: String,
  },
  model: {
    type: String,
  }
});

const cartSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
