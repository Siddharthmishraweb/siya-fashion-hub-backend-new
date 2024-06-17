const Product = require('../models/productModel');

const getAllProducts = async () => {
  return await Product.find();
};

const getProductById = async (id) => {
  return await Product.findById(id);
};

const createProduct = async (productData) => {
  const product = new Product(productData);
  await product.save();
  return product;
};

const updateProduct = async (id, productData) => {
  return await Product.findByIdAndUpdate(id, productData, { new: true });
};

const deleteProduct = async (id) => {
  await Product.findByIdAndDelete(id);
};

const transformProductData = (products) => {
  return products.map(product => {
    const allVariants = product.variants.map(variant => ({
      variantId: variant._id.toString(),
      color: variant.color,
      currentPrice: variant.variantPrice,
      discount: ((product.price - variant.variantPrice) / product.price) * 100,
      actualPrice: variant.variantPrice - (((product.price - variant.variantPrice) / product.price) * 100),
      slides: variant.images.map(image => ({
        src: image.src,
        url: '', // Assuming there is no URL provided in the given structure
        id: image._id.toString()
      })),
      skus: variant.skus.map(sku => ({
        skuId: sku.skuId,
        size: sku.size,
        quantity: sku.quantity
      })),
      isSoldOut: variant.skus.every(sku => sku.quantity === 0)
    }));

    // Find the first non-sold-out variant to set as the main variant
    const mainVariant = allVariants.find(variant => !variant.isSoldOut) || allVariants[0];

    return {
      productId: product._id.toString(),
      variantId: mainVariant.variantId,
      color: mainVariant.color,
      currentPrice: mainVariant.currentPrice,
      actualPrice: product.price,
      model: product.model,
      type: product.type,
      discount: mainVariant.discount,
      slides: mainVariant.slides,
      skus: mainVariant.skus,
      isSoldOut: mainVariant.isSoldOut,
      allVariants
    };
  });
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  transformProductData
};
