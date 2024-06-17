// const cartService = require('../services/cartService');

// const getCart = async (req, res) => {
//   try {
//     const cart = await cartService.getCart(req.user.id);
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const addItemToCart = async (req, res) => {
//   try {
//     const cart = await cartService.addItemToCart(req.user.id, req.body);
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const removeItemFromCart = async (req, res) => {
//   try {
//     const cart = await cartService.removeItemFromCart(req.user.id, req.params.itemId);
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   getCart,
//   addItemToCart,
//   removeItemFromCart,
// };



// const Cart = require('../models/Cart');

const Cart = require('../models/cartModel');

// const Product = require('../models/Product'); // Assuming you have a Product model to get stock information
const Product = require('../models/productModel');

const getCart = async (req, res) => {
  try {
    console.log("aaya toh h ******************");
    const { uid } = req.user; // Assuming `req.user` contains authenticated user information
    // const { uid } = req.body;
    console.log("uid ::  ", uid);
    const cart = await Cart.findOne({ uid });
    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    console.log(cart);
    const productId = cart.productId;
    const product = Product.findOne({ _id: productId});

    console.log("product -------------  ", product)
    
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const addItem = async (req, res) => {
//   console.log("aayo h")
//   const { productId, skuId, size } = req.body;
//   // const { uid } = req.user; // Assuming `req.user` contains authenticated user information
//   const uid = '666d5b9a5f674df62276945f';
//   try {
//     // const product = await Product.findOne({ _id: productId, "skus.skuId": skuId });
//     const Allproduct = await Product.findOne({ _id: productId });

//     const product = await Product.aggregate([
//       {
//         $match: {
//           _id: productId
//         }
//       }
//     ])
//     console.log("product id::", product);
//     // const sku = product.skus.find(sku => sku.skuId === skuId);
//     const { sku } = product[0];

//     console.log("sku::: ", sku);
//     const availableQuantity = sku.quantity;

//     let cart = await Cart.findOne({ uid });
//     if (!cart) {
//       cart = new Cart({ uid, items: [] });
//     }

//     const itemIndex = cart.items.findIndex(item => item.skuId === skuId);
//     if (itemIndex !== -1) {
//       if (cart.items[itemIndex].quantity < availableQuantity) {
//         cart.items[itemIndex].quantity += 1;
//       } else {
//         return res.status(400).json({ error: 'All available stock is currently in cart!' });
//       }
//     } else {
//       cart.items.push({ productId, skuId, size, quantity: 1 });
//     }

//     await cart.save();
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



const addItem = async (req, res) => {
  // console.log("Received add item request");
  // console.log(req.body);
  const { productId, skuId, size , variantId, type, color, price, image, model } = req.body;
  // const { uid } = req.user; // Assuming `req.user` contains authenticated user information
  const uid = '666d5b9a5f674df62276945f';

  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { variants } = product;
    let sku;
    for (const variant of variants) {
      sku = variant.skus.find(s => s.skuId === skuId);
      if (sku) break;
    }

    if (!sku) {
      return res.status(404).json({ error: 'SKU not found for the given product' });
    }

    const availableQuantity = sku.quantity;

    let cart = await Cart.findOne({ uid });
    if (!cart) {
      cart = new Cart({ uid, items: [] });
    }

    console.log("skuId::: ", skuId);
    console.log("cart.items::: ", cart.items);
    

    const itemIndex = cart.items.findIndex(item => item.skuId === skuId);
    if (itemIndex !== -1) {
      if (cart.items[itemIndex].quantity < availableQuantity) {
        cart.items[itemIndex].quantity += 1;
      } else {
        return res.status(400).json({ error: 'All available stock is currently in cart!' });
      }
    } else {
      cart.items.push({ productId, skuId, size, quantity: 1, variantId, type, color, price, image, model });
    }

    await cart.save();

    console.log("itemIndex::   ", itemIndex);
    console.log("sku::   ", sku);

    const productItem = product;
    const productVariants = productItem?.variants;
    // const updatedCart = [];
    // for (let i = 0; i < productVariants.length; i++) {
    //   const variant = productVariants[i];
    //   for (let j = 0; j < cart.items.length; j++) {
    //     const cartItem = cart.items[j];
    //     if (variant.skus.some(sku => sku.skuId === cartItem.skuId)) {
    //       const item = {
    //         color: variant.color,
    //         price: variant.variantPrice,
    //         ...cartItem  // include all properties from cart item
    //       };
    //       updatedCart.push(item);
    //       break;  // exit inner loop
    //     }
    //   }
    // }
    //console.log(productItem);
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: error.message });
  }
};


const removeItem = async (req, res) => {
  const { productId, skuId } = req.body;
  const { uid } = req.user;
  try {
    const cart = await Cart.findOne({ uid });
    if (!cart) {
      return res.status(400).json({ error: 'Cart does not exist!' });
    }

    const itemIndex = cart.items.findIndex(item => item.skuId === skuId);
    if (itemIndex !== -1) {
      if (cart.items[itemIndex].quantity > 1) {
        cart.items[itemIndex].quantity -= 1;
      } else {
        cart.items = cart.items.filter(item => item.skuId !== skuId);
      }
    } else {
      return res.status(400).json({ error: 'Item not found in cart!' });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  const { skuId } = req.body;
  const { uid } = req.user;
  try {
    const cart = await Cart.findOne({ uid });
    if (!cart) {
      return res.status(400).json({ error: 'Cart does not exist!' });
    }

    cart.items = cart.items.filter(item => item.skuId !== skuId);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCart = async (req, res) => {
  const { uid } = req.user;
  try {
    await Cart.findOneAndDelete({ uid });
    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCart,
  addItem,
  removeItem,
  deleteItem,
  deleteCart,
};
