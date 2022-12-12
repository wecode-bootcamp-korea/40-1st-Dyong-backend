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

const getUserById = async (id) => {
  try {
    return await appDataSource.query(`
    SELECT u.id, u.username, u.password
    FROM users u 
    WHERE u.username = '${id}'
    `);
  } catch (err) {
    console.log(err);
    const error = new Error('INVALID_USER');
    error.statusCode = 404;
    throw error;
  }
};

module.exports = {
  appDataSource,
  getUserById,
};
