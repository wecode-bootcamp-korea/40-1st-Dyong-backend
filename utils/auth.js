const jwt = require('jsonwebtoken');

const loginRequired = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    const error = new Error('NEED_ACCESS_TOKEN');
    error.statusCode = 401;

    return res.status(error.statusCode).json({ message: error.message });
  }

  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
  req.data = decoded.id;
  next();
};

module.exports = {
  loginRequired,
};
