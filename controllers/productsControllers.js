const {
  getProductsByType,
  allProducts,
  getProductsBySort,
  getProductsBySortQuery,
} = require('../models/productsDao.js');

const getAllProducts = async (req, res) => {
  const { type, sort, offset, limit } = req.query;
  try {
    if (!type && !sort) {
      const data = await allProducts(offset, limit);
      return res.status(200).json(data);
    }
    if (!sort) {
      const result = type.split(',');
      const data = await getProductsByType(result, offset, limit);
      return res.status(200).json(data);
    }
    if (!type) {
      const data = await getProductsBySort(sort, offset, limit);
      return res.status(200).json(data);
    }
    if (type && sort) {
      const result = type.split(',');
      const data = await getProductsBySortQuery(result, sort, offset, limit);
      return res.status(200).json(data);
    }
  } catch (err) {
    return res.status(err.statusCode || 500).json(err.message);
  }
};

module.exports = {
  getAllProducts,
};
