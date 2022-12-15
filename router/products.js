const express = require('express');
const {
  getAllProducts,
  getProductsByCategory,
  getProductsById
} = require('../controllers/productsControllers.js');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:category', getProductsByCategory);
router.get('/detail/:productId', getProductsById);

module.exports = router;
