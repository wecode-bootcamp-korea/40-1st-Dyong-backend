const { DataSource } = require('typeorm');
const dotenv = require('dotenv');
const limit = 6;
dotenv.config();

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log('data has been initialized!');
  })
  .catch((err) => {
    console.log(err);
  });

const allProducts = async (page) => {
  const start = parseInt(page) * 6;
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
  const start = parseInt(page) * 6;
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
  const start = parseInt(page) * 6;
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
  const start = parseInt(page) * 6;
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
  const start = parseInt(page) * 6;
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
  const start = parseInt(page) * 6;
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
  const start = parseInt(page) * 6;
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
  const start = parseInt(page) * 6;
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
module.exports = {
  appDataSource,
  allProducts,
  getProductsByType,
  getProductsBySort,
  getProductsBySortQuery,
  getCategoryBySort,
  getCategory,
  getCategoryByType,
  getCategoryBySortQuery,
};
