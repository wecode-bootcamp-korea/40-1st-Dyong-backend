const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => next(err));
  };
};

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({ message: err.message });
};

module.exports = {
  catchAsync,
  errorHandler,
};
