const { signUpService, signInService } = require('../services/userService');

const signUp = async (req, res) => {
  const { fullName, email, username, password, phoneNumber } = req.body;

  if (!fullName || !email || !username || !password || !phoneNumber) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const insertId = await signUpService(
    fullName,
    email,
    username,
    password,
    phoneNumber
  );

  res.status(201).json({ insertId });
};

const signIn = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const token = await signInService(username, password);

    return res.status(200).json({ accessToken: token });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  signIn,
};
