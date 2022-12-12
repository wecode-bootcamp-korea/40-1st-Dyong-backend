const { allProducts, getCategory } = require('../models/productsDao.js');
const {
  sortOnly,
  typeOnly,
  typeAndSort,
} = require('../services/productsService.js');

const getAllProducts = async (req, res) => {
  const { type, sort } = req.query;
  const page = req.query.p;
  try {
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
  } catch (err) {
    return res.status(err.statusCode || 500).json(err.message);
  }
};

const getProductsByCategory = async (req, res) => {
  const { type, sort } = req.query;
  const page = req.query.p;
  const category = req.params.category;
  try {
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
  } catch (err) {
    return res.status(err.statusCode || 500).json(err.message);
  }
};
module.exports = {
  getAllProducts,
  getProductsByCategory,
};
