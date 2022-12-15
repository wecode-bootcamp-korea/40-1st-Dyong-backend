const express = require('express');
const {
  getCart,
  deleteCart,
  postOrder,
} = require('../controllers/paymentController.js');
const { loginRequired } = require('../utils/auth.js');

const productRouter = require('./products.js');
const userRouter = require('./user.js');
const router = express.Router();

router.use('/products', productRouter);
router.use('/users', userRouter);
router.get('/cart/list', loginRequired, getCart);
router.delete('/cart/list', loginRequired, deleteCart);
router.post('/cart/list', loginRequired, postOrder);

module.exports = router;
