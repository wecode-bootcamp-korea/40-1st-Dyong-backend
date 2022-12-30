const { catchAsync } = require('../middlewares/error-handling');
const { signUpService, signInService } = require('../services/userService');

const signUp = catchAsync(async (req, res) => {
  const { fullName, email, username, password, phoneNumber } = req.body;

  if (!fullName || !email || !username || !password || !phoneNumber) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  await signUpService(fullName, email, username, password, phoneNumber);

  return res.status(201).json({ message: 'USER_CREATED' });
});

const signIn = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const token = await signInService(username, password);
    console.log(token);
    return res.status(200).json({ accessToken: token });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  signIn,
};
