const { allProducts } = require('../models/productsDao.js');

const getAllProducts = async (req, res) => {
  try {
    const data = await allProducts();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(err.statusCode || 500).json(err.message);
  }
};

module.exports = {
  getAllProducts,
};
