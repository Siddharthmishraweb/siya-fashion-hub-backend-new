const Cart = require('../models/cartModel');

const getCart = async (userId) => {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
    await cart.save();
  }
  return cart;
};

const addItemToCart = async (userId, item) => {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [item] });
  } else {
    cart.items.push(item);
  }
  await cart.save();
  return cart;
};

const removeItemFromCart = async (userId, itemId) => {
  let cart = await Cart.findOne({ userId });
  cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
  await cart.save();
  return cart;
};

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart,
};
