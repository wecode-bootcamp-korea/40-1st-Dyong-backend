const dotenv = require('dotenv');
const { appDataSource } = require('./appDatasource');
const limit = 8;
dotenv.config();

const allProducts = async (page) => {
  console.log(page);
  const start = parseInt(page) * 8;
  try {
    const data = await appDataSource.query(`
        SELECT
            p.id,
            p.name,
            p.price,
            i.main_image,
            i.sub_image
        FROM 
            products p
        INNER JOIN 
            images i
        ON 
            p.image_id = i.id
        LIMIT ${start}, ${limit}
        `);
    return data;
  } catch (err) {
    console.log(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

const getProductsByType = async (type, page) => {
  const start = parseInt(page) * 8;
  try {
    const data = await appDataSource.query(`
      SELECT
          p.id,
          p.name,
          p.price,
          i.main_image,
          i.sub_image
      FROM 
            products p
      INNER JOIN 
          images i 
      ON 
          p.image_id = i.id
      INNER JOIN 
          product_types t
      ON 
          p.product_type_id = t.id
      WHERE 
          ${type}
      LIMIT ${start}, ${limit}
      `);
    return data;
  } catch (err) {
    console.log(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

const getProductsBySort = async (order, page) => {
  const start = parseInt(page) * 8;
  try {
    const data = await appDataSource.query(`
        SELECT 
            p.id,
            p.name,
            p.price,
            i.main_image,
            i.sub_image
        FROM 
            products p
        INNER JOIN 
            images i
        ON 
            p.image_id = i.id
        ORDER BY 
            ${order}
        LIMIT ${start}, ${limit}
        `);
    return data;
  } catch (err) {
    console.log(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

const getProductsBySortQuery = async (order, page) => {
  const start = parseInt(page) * 8;
  try {
    const data = await appDataSource.query(`
      SELECT 
          p.id,
          p.name,
          p.price,
          i.main_image,
          i.sub_image
      FROM 
          products p
      INNER JOIN 
          images i 
      ON 
            p.image_id = i.id
      INNER JOIN 
          product_types t
      ON 
          p.product_type_id = t.id
      WHERE 
          ${order}
      LIMIT ${start}, ${limit}
      `);
    return data;
  } catch (err) {
    console.log(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

const getCategory = async (page, category) => {
  const start = parseInt(page) * 8;
  try {
    const data = await appDataSource.query(`
    SELECT
        p.id,
        p.name,
        p.price,
        i.main_image,
        i.sub_image
    FROM 
        products p
    INNER JOIN 
        images i
    ON 
        p.image_id = i.id
    INNER JOIN
        categories c
    ON 
        p.category_id = c.id
    WHERE 
        c.name = '${category}'
    LIMIT ${start}, ${limit}
    `);
    return data;
  } catch (err) {
    console.log(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

const getCategoryBySort = async (order, page, category) => {
  const start = parseInt(page) * 8;
  try {
    const data = await appDataSource.query(`
        SELECT 
            p.id,
            p.name,
            p.price,
            i.main_image,
            i.sub_image
        FROM 
            products p
        INNER JOIN 
            images i
        ON 
            p.image_id = i.id
        INNER JOIN
            categories c
        ON 
            p.category_id = c.id
        WHERE 
            c.name = '${category}'
        ORDER BY 
            ${order}
        LIMIT ${start}, ${limit}
        `);
    return data;
  } catch (err) {
    console.log(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

const getCategoryByType = async (order, page, category) => {
  const start = parseInt(page) * 8;
  try {
    const data = await appDataSource.query(`
        SELECT 
            p.id,
            p.name,
            p.price,
            i.main_image,
            i.sub_image
        FROM 
            products p
        INNER JOIN 
            images i
        ON 
            p.image_id = i.id
        INNER JOIN
            categories c
        ON
            p.category_id = c.id
        INNER JOIN
            product_types t
        ON
            p.product_type_id = t.id
        WHERE
            c.name = '${category}'
        ORDER BY 
            ${order}
        LIMIT ${start}, ${limit}
        `);
    return data;
  } catch (err) {
    console.log(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

const getCategoryBySortQuery = async (order, page) => {
  const start = parseInt(page) * 8;
  try {
    const data = await appDataSource.query(`
      SELECT 
          p.id,
          p.name,
          p.price,
          i.main_image,
          i.sub_image
      FROM 
          products p
      INNER JOIN 
          images i 
      ON 
          p.image_id = i.id
      INNER JOIN 
          product_types t
      ON 
          p.product_type_id = t.id
      INNER JOIN
          categories c 
      ON
          c.id = p.category_id
      WHERE 
          ${order}
      LIMIT ${start}, ${limit}
      `);
    return data;
  } catch (err) {
    console.log(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

const getProductsById = async (id) => {
  const data = await appDataSource.query(
    `
        SELECT
            p.id,
            p.name,
            p.content,
            p.price,
            p.category_id,
            i.main_image,
            i.content_image
        FROM 
            products as p
        INNER JOIN 
          images as i 
        ON 
          p.image_id = i.id
        WHERE 
        p.id = '${id}'
        `
  );
  return data;
};
module.exports = {
  allProducts,
  getProductsByType,
  getProductsBySort,
  getProductsBySortQuery,
  getCategoryBySort,
  getCategory,
  getCategoryByType,
  getCategoryBySortQuery,
  getProductsById,
};
