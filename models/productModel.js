const mongoose = require('mongoose');

const skuSchema = new mongoose.Schema({
  skuId: { type: String, required: true },
  size: { type: String },
  quantity: { type: Number, required: true },
});

const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  images: [{ id: String, src: String }],
  variantPrice: { type: Number, required: true },
  skus: [skuSchema],
});

const productSchema = new mongoose.Schema({
  collection: { type: String, required: true },
  fit: { type: String },
  description: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  slug: { type: String, required: true },
  type: { type: String, required: true },
  variants: [variantSchema],
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
