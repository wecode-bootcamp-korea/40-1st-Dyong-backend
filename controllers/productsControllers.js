const {
  getProductsByType,
  allProducts,
  getProductsBySort,
  getProductsBySortQuery,
} = require('../models/productsDao.js');

const getAllProducts = async (req, res) => {
  const { type, sort } = req.query;
  try {
    if (!type && !sort) {
      const data = await allProducts();
      return res.status(200).json(data);
    }
    if (!sort) {
      const result = type.split(',');
      const data = await getProductsByType(result);
      return res.status(200).json(data);
    }
    if (!type) {
      const data = await getProductsBySort(sort);
      return res.status(200).json(data);
    }
    if (type && sort) {
      const result = type.split(',');
      const data = await getProductsBySortQuery(result, sort);
      return res.status(200).json(data);
    }
  } catch (err) {
    return res.status(err.statusCode || 500).json(err.message);
  }
};

module.exports = {
  getAllProducts,
};
