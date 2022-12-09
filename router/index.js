const express = require('express');
const productRouter = require('./products.js');
const router = express.Router();

router.use('/products', productRouter);

module.exports = router;
