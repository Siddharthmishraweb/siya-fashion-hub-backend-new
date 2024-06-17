const Order = require('../models/orderModel');

const createOrder = async (userId, orderData) => {
  const order = new Order({ ...orderData, createdBy: userId });
  await order.save();
  return order;
};

const getOrderById = async (id) => {
  return await Order.findById(id);
};

const getUserOrders = async (userId) => {
  return await Order.find({ createdBy: userId });
};

module.exports = {
  createOrder,
  getOrderById,
  getUserOrders,
};
