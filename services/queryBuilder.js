const sortBy = (sort) => {
  switch (sort) {
    case 'new-arrival':
      return 'p.created_at DESC';
    case 'price-desc':
      return 'p.price DESC';
    case 'price-asc':
      return 'p.price';
  }
};

const typeBy = (type) => {
  const length = type.length;
  switch (length) {
    case 1:
      return `t.name = '${type[0]}'`;
    case 2:
      return `t.name = '${type[0]}' OR t.name = '${type[1]}'`;
    case 3:
      return `t.name = '${type[0]}' OR t.name = '${type[1]}' OR t.name = '${type[2]}'`;
    case 4:
      return `t.name = '${type[0]}' OR t.name = '${type[1]}' OR t.name = '${type[2]}' OR t.name = '${type[3]}'`;
  }
};

const deleteQuery = (productId, userId) => {
  const results = productId.split(',');
  let query;
  for (const i in results) {
    const result = results[i];
    if (i === '0') {
      query = `user_id = ${userId} AND (product_id = ${result}`;
    } else {
      query += ` OR product_id = ${result}`;
    }
  }
  query += ')';
  return query;
};

const searchCartQuery = (cartId) => {
  const results = cartId.split(',');
  let query;
  for (const i in results) {
    const result = results[i];
    if (i === '0') {
      query = `c.id = ${result}`;
    } else {
      query += ` OR c.id = ${result}`;
    }
  }
  console.log(query);
  return query;
};

const insertOrderQuery = (cartId) => {
  const results = cartId.split(',');
  let query;
  for (const i in results) {
    const result = results[i];
    if (i === '0') {
      query = `(${result}, 2)`;
    } else {
      query += `,(${result}, 2)`;
    }
  }
  console.log(query);
  return query;
};

const deleteCartByCartIdQuery = (results) => {
  let query;
  for (const i in results) {
    const result = results[i];
    const userId = result.user_id;
    const productId = result.product_id;
    if (i === '0') {
      query = `user_id = ${userId} AND (product_id = ${productId}`;
    } else {
      query += ` OR product_id = ${productId}`;
    }
  }
  query += ')';
  return query;
};
// const deleteCartByCartIdQuery = (cartId) => {
//   const results = cartId.split(',');
//   let query;
//   for (const i in results) {
//     const result = results[i];
//     if(i === '0') {
//       query = ``
//     }
//   }

// }
module.exports = {
  sortBy,
  typeBy,
  deleteQuery,
  searchCartQuery,
  insertOrderQuery,
  deleteCartByCartIdQuery,
};
