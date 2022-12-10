const { DataSource } = require('typeorm');
const dotenv = require('dotenv');

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

const allProducts = async () => {
  try {
    const data = await appDataSource.query(`
    SELECT 
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
    `);
    return data;
  } catch (err) {
    console.log(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

const getProductsByType = async (type) => {
  try {
    if (type.length === 1) {
      const data = await appDataSource.query(`
      SELECT 
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
      t.name = '${type[0]}'
      `);
      return data;
    }
    if (type.length === 2) {
      const data = await appDataSource.query(`
          SELECT 
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
          t.name = '${type[0]}' OR t.name = '${type[1]}'
          `);
      return data;
    }
    if (type.length === 3) {
      const data = await appDataSource.query(`
            SELECT 
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
            t.name = '${type[0]}' OR t.name = '${type[1]}' OR t.name = '${type[2]}'
            `);
      return data;
    }
    if (type.length === 4) {
      const data = await appDataSource.query(`
            SELECT 
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
            t.name = '${type[0]}' OR t.name = '${type[1]}' OR t.name = '${type[2]} 'OR t.name = '${type[3]}'
            `);
      return data;
    }
  } catch (err) {
    console.log(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

const getProductsBySort = async (sort) => {
  let order;
  if (sort === 'new-arrival') {
    order = 'p.created_at DESC';
  }
  if (sort === 'price-desc') {
    order = 'p.price DESC';
  }
  if (sort === 'price-asc') {
    order = 'p.price';
  }
  try {
    const data = await appDataSource.query(`
        SELECT 
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
        `);
    return data;
  } catch (err) {
    console.log(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

const getProductsBySortQuery = async (type, sort) => {
  let order;
  if (sort === 'new-arrival') {
    order = 'p.created_at DESC';
  }
  if (sort === 'price-desc') {
    order = 'p.price DESC';
  }
  if (sort === 'price-asc') {
    order = 'p.price';
  }
  try {
    if (type.length === 1) {
      const data = await appDataSource.query(`
      SELECT 
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
      t.name = '${type[0]}'
      ORDER BY
      ${order}
      `);
      return data;
    }
    if (type.length === 2) {
      const data = await appDataSource.query(`
          SELECT 
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
          t.name = '${type[0]}' OR t.name = '${type[1]}'
          ORDER BY
          ${order}
          `);
      return data;
    }
    if (type.length === 3) {
      const data = await appDataSource.query(`
            SELECT 
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
            t.name = '${type[0]}' OR t.name = '${type[1]}' OR t.name = '${type[2]}'
            ORDER BY
            ${order}
            `);
      return data;
    }
    if (type.length === 4) {
      const data = await appDataSource.query(`
            SELECT 
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
            t.name = '${type[0]}' OR t.name = '${type[1]}' OR t.name = '${type[2]} 'OR t.name = '${type[3]}'
            ORDER BY 
            ${order}
            `);
      return data;
    }
  } catch (err) {
    console.log(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  allProducts,
  getProductsByType,
  getProductsBySort,
  getProductsBySortQuery,
};
