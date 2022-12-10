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

module.exports = {
  allProducts,
};
