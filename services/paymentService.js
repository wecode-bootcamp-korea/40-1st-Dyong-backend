const {
  getCart,
  postCart,
  checkProduct,
  updateCart,
  deleteCart,
  postOrder,
  updateCartByCartId,
} = require('../models/paymentDao');
const { updateUserPoint } = require('../models/userDao');
const {
  deleteQuery,
  searchCartQuery,
  insertOrderQuery,
} = require('./queryBuilder');

const postCartService = async (productId, userId, quantity) => {
  if (quantity <= 0) {
    const error = new Error('WRONG_INPUT');
    error.statusCode = 400;
    throw error;
  }
  const isExist = await checkProduct(productId, userId);
  if (isExist.length === 1) {
    return await updateCart(productId, userId, quantity);
  } else {
    return await postCart(productId, userId, quantity);
  }
};

const getCartService = async (id) => {
  const data = await getCart(id);
  return data;
};

const deleteCartService = async (productId, userId) => {
  const order = deleteQuery(productId, userId);
  return await deleteCart(order);
};

const orderService = async (cartId, userId, sum) => {
  const cartOrder = searchCartQuery(cartId);
  await updateCartByCartId(cartOrder);
  const order = insertOrderQuery(cartId);
  await postOrder(order);
  return await updateUserPoint(userId, sum);
};
module.exports = {
  postCartService,
  getCartService,
  deleteCartService,
  orderService,
};
