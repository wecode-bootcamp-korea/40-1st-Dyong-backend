const express = require('express');

const productRouter = require('./products.js');
const userRouter = require('./user.js');
const router = express.Router();

router.use('/products', productRouter);
router.use('/users', userRouter);

module.exports = router;
