const express = require('express');
const { signUp, signin } = require('../controllers/userController.js');

const router = express.Router();

router.post('/signup', signUp)
router.post('/signin', signin);

module.exports = router;
