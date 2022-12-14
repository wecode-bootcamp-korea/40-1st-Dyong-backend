const express = require('express');
const { signUp, signIn } = require('../controllers/userController.js');

const router = express.Router();

router.post('/signup', signUp);
router.post('/signIn', signIn);

module.exports = router;
