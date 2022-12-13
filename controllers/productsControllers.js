const { catchAsync } = require('../middlewares/error-handling.js');
const { allProducts, getCategory } = require('../models/productsDao.js');
const {
  sortOnly,
  typeOnly,
  typeAndSort,
} = require('../services/productsService.js');

const getAllProducts = catchAsync(async (req, res, next) => {
  const { type, sort, page } = req.query;

  if (!type && !sort) {
    const data = await allProducts(page);
    return res.status(200).json(data);
  }
  if (!sort) {
    const data = await typeOnly(type, page);
    return res.status(200).json(data);
  }
  if (!type) {
    const data = await sortOnly(sort, page);
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

  if (!type && !sort) {
    const data = await getCategory(page, category);
    return res.status(200).json(data);
  }
  if (!sort) {
    const data = await typeOnly(type, page, category);
    return res.status(200).json(data);
  }
  if (!type) {
    const data = await sortOnly(sort, page, category);
    return res.status(200).json(data);
  }
  if (type && sort) {
    const data = await typeAndSort(type, sort, page, category);
    return res.status(200).json(data);
  }
});
module.exports = {
  getAllProducts,
  getProductsByCategory,
};
