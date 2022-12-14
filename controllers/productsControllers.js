const { catchAsync } = require('../middlewares/error-handling.js');
const {
  sortOnly,
  typeOnly,
  typeAndSort,
  productsDetail,
} = require('../services/productsService.js');

const getAllProducts = catchAsync(async (req, res, next) => {
  const { type, sort, page } = req.query;

  if (!type) {
    const data = await sortOnly(sort, page);
    return res.status(200).json(data);
  }
  if (!sort) {
    const data = await typeOnly(type, page);
    return res.status(200).json(data);
  }
  if (type && sort) {
    const data = await typeAndSort(type, sort, page);
    return res.status(200).json(data);
  }
});

const getProductsByCategory = catchAsync(async (req, res, next) => {
  const { type, sort, page } = req.query;
  const category = req.params.category;
  console.log(category);
  if (!type) {
    const data = await sortOnly(sort, page, category);
    return res.status(200).json(data);
  }
  if (!sort) {
    const data = await typeOnly(type, page, category);
    return res.status(200).json(data);
  }
  if (type && sort) {
    const data = await typeAndSort(type, sort, page, category);
    return res.status(200).json(data);
  }
});

const getProductsById = catchAsync(async (req, res) => {
  const productId = await productsDetail(req.params.productId);
  return res.status(200).json(productId);
});

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductsById,
};
