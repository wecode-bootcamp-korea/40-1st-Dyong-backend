const {
  getProductsBySort,
  getProductsByType,
  getProductsBySortQuery,
  getCategoryBySort,
  getCategoryByType,
  getCategoryBySortQuery,
} = require('../models/productsDao');
const { sortBy, typeBy } = require('./queryBuilder.js');

const sortOnly = async (sort, page, category) => {
  const order = sortBy(sort);
  try {
    if (category) {
      const data = await getCategoryBySort(order, page, category);
      return data;
    } else {
      const data = await getProductsBySort(order, page);
      return data;
    }
  } catch (err) {
    throw err;
  }
};

const typeOnly = async (type, page, category) => {
  const result = type.split(',');
  const order = typeBy(result);
  try {
    if (category) {
      const data = await getCategoryByType(order, page, category);
      return data;
    } else {
      const data = await getProductsByType(order, page);
      return data;
    }
  } catch (err) {
    throw err;
  }
};

const typeAndSort = async (type, sort, page, category) => {
  const result = type.split(',');
  const typeQuery = typeBy(result);
  const sortQuey = sortBy(sort);
  try {
    if (category) {
      const order = `${typeQuery} AND c.name = '${category}' ORDER BY ${sortQuey}`;
      const data = await getCategoryBySortQuery(order, page);
      return data;
    } else {
      const order = `${typeQuery} ORDER BY ${sortQuey}`;
      const data = await getProductsBySortQuery(order, page);
      return data;
    }
  } catch (err) {
    throw err;
  }
};
module.exports = {
  sortOnly,
  typeOnly,
  typeAndSort,
};
