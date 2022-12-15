const express = require('express');
const { postCart } = require('../controllers/paymentController.js');
const {
  getAllProducts,
  getProductsByCategory,
} = require('../controllers/productsControllers.js');
const { loginRequired } = require('../utils/auth.js');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:category', getProductsByCategory);
router.post('/detail/:id', loginRequired, postCart);

module.exports = router;
