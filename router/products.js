const express = require('express');
const {
  getAllProducts,
  getProductsByCategory,
} = require('../controllers/productsControllers.js');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:category', getProductsByCategory);

module.exports = router;
