const express = require('express');
const { getAllProducts } = require('../controllers/productsControllers.js');

const router = express.Router();

router.get('/', getAllProducts);

module.exports = router;
