const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserById } = require('../models/userDao');

const login = async (req, res, next) => {
  const { id, password } = req.body;
  try {
    if (!id || !password) {
      const error = new Error('WRONG_INPUT');
      error.statusCode = 400;
      throw error;
    }
    const user = await getUserById(id);
    if (user.length === 0) {
      return res.status(404).json({ message: 'USER_NOT_FOUND' });
    }
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'INVALID_USER' });
    }
    const token = jwt.sign({ id: user[0].id }, process.env.COOKIE_SECRET);
    return res.status(200).json({ accessToken: token });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  login,
};
