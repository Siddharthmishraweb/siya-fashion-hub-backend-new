const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// router.get('/', authMiddleware, cartController.getCart);
// router.post('/', authMiddleware, cartController.addItemToCart);
// router.delete('/:itemId', authMiddleware, cartController.removeItemFromCart);

router.get('/', cartController.getCart);
router.post('/', cartController.addItem);
router.delete('/:itemId', cartController.removeItem);

module.exports = router;
