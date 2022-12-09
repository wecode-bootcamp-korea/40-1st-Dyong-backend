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
    p.content,
    p.price,
    i.main_image,
    i.sub_image,
    i.content_image,
    c.name as category,
    t.name as type
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
    p.product_type_id = t.id;
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
  allProducts,
};
