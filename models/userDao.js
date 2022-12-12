const { DataSource } = require('typeorm');
const dotenv = require('dotenv');

dotenv.config();

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
