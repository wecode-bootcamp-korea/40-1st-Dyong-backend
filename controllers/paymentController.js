const { catchAsync } = require('../middlewares/error-handling');
const {
  getCartService,
  postCartService,
  deleteCartService,
  orderService,
} = require('../services/paymentService');

const postCart = catchAsync(async (req, res, next) => {
  const productId = req.params.productId;
  const userId = req.data;
  const quantity = req.body.quantity;
  await postCartService(productId, userId, quantity);
  return res.status(201).json({ message: 'ADDED' });
});

const getCart = catchAsync(async (req, res, next) => {
  const id = req.data;
  const data = await getCartService(id);
  return res.status(200).json(data);
});

const deleteCart = catchAsync(async (req, res, next) => {
  const userId = req.data;
  const productId = req.body.id;
  await deleteCartService(productId, userId);
  return res.status(200).json({ message: 'DELETED' });
});

const postOrder = catchAsync(async (req, res, next) => {
  const cartId = req.body.id;
  const sum = req.body.sum;
  const userId = req.data;
  await orderService(cartId, userId, sum);
  return res.status(200).json({ message: 'purchased!' });
});

module.exports = {
  postCart,
  getCart,
  deleteCart,
  postOrder,
};
