const {
  getProductsBySort,
  getProductsByType,
  getProductsBySortQuery,
} = require('../models/productsDao');
const { sortBy, typeBy } = require('./queryBuilder.js');

const sortOnly = async (sort, page) => {
  try {
    const order = sortBy(sort);
    const data = await getProductsBySort(order, page);
    return data;
  } catch (err) {
    throw err;
  }
};

const typeOnly = async (type, page) => {
  try {
    const result = type.split(',');
    const order = typeBy(result);
    const data = await getProductsByType(order, page);
    return data;
  } catch (err) {
    throw err;
  }
};

const typeAndSort = async (type, sort, page) => {
  try {
    const result = type.split(',');
    const typeQuery = typeBy(result);
    const sortQuey = sortBy(sort);
    const order = `${typeQuery} ORDER BY ${sortQuey}`;
    const data = await getProductsBySortQuery(order, page);
    return data;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  sortOnly,
  typeOnly,
  typeAndSort,
};
