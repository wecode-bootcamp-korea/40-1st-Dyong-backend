const { appDataSource } = require('./appDatasource');

const postCart = async (productId, userId, quantity) => {
  return await appDataSource.query(
    `
      INSERT INTO 
          carts
      (
        product_id,
        user_id,
        quantity,
        status_code_id
      ) 
      VALUES (
        ?,?,?,1
      )
`,
    [productId, userId, quantity]
  );
};

const getCart = async (id) => {
  const data = await appDataSource.query(`
  SELECT
      c.id as cartId,
      p.name,
      p.price,
      i.main_image as image,
      c.quantity
  FROM 
      carts c
  INNER JOIN
      products p
  ON
      c.product_id = p.id
  INNER JOIN
      users u
  ON
      c.user_id = u.id
  INNER JOIN
      images i
  ON
      i.id = p.image_id
  WHERE
      u.id = ${id} AND c.status_code_id = 1
  `);
  return data;
};

const checkProduct = async (productId, userId) => {
  const data = await appDataSource.query(`
  SELECT
      product_id,
      user_id
  FROM
      carts
  WHERE
      product_id = ${productId} AND user_id = ${userId} AND status_code_id = 1
  `);
  return data;
};

const updateCart = async (productId, userId, quantity) => {
  return await appDataSource.query(`
    UPDATE
        carts
    SET
        quantity = quantity + ${quantity}
    WHERE
        product_id = ${productId} 
    AND 
        user_id = ${userId}
    AND 
        status_code_id = 1
  `);
};

const deleteCart = async (order) => {
  return await appDataSource.query(`
  DELETE FROM
      carts
  WHERE
      ${order} AND status_code_id = 1
  `);
};

const searchCart = async (order) => {
  return await appDataSource.query(`
  SELECT
      c.product_id,
      c.user_id
  FROM
      carts c
  WHERE
    ${order}
  `);
};

const postOrder = async (order) => {
  return await appDataSource.query(`
  INSERT INTO
      orders
  (
    cart_id,
    status_code_id
    )
    VALUES
      ${order}
  `);
};

const deleteCartByCartId = async (order) => {
  return await appDataSource.query(`
  DELETE FROM
      carts c
  WHERE
      ${order}
  `);
};

const updateCartByCartId = async (order) => {
  return await appDataSource.query(`
  UPDATE
      carts c
  SET
      c.status_code_id = 2
  WHERE
      ${order}
  `);
};
module.exports = {
  postCart,
  getCart,
  checkProduct,
  updateCart,
  deleteCart,
  postOrder,
  deleteCartByCartId,
  searchCart,
  updateCartByCartId,
};
