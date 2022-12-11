const {
  getProductsByType,
  allProducts,
  getProductsBySort,
  getProductsBySortQuery,
} = require('../models/productsDao.js');

const getAllProducts = async (req, res) => {
  const { type, sort, page } = req.query;
  try {
    if (!type && !sort) {
      const data = await allProducts(page);
      return res.status(200).json(data);
    }
    if (!sort) {
      const result = type.split(',');
      const data = await getProductsByType(result, page);
      return res.status(200).json(data);
    }
    if (!type) {
      const data = await getProductsBySort(sort, page);
      return res.status(200).json(data);
    }
    if (type && sort) {
      const result = type.split(',');
      const data = await getProductsBySortQuery(result, sort, page);
      return res.status(200).json(data);
    }
  } catch (err) {
    return res.status(err.statusCode || 500).json(err.message);
  }
};

module.exports = {
  getAllProducts,
};
