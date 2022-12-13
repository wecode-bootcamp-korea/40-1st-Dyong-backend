const express = require('express');
const userController = require('../controllers/usercontroller');

const router = express.Router();

router.post('/signup', userController.signUp)
//:8000/users/signup
module.exports = router;
