const dotenv = require('dotenv');
const { DataSource } = require('typeorm');

dotenv.config();

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

const createUser = async (fullName, email, username, password, phoneNumber) => {
  return await appDataSource.query(
    `
  INSERT INTO users (
    full_name,
    email,
    username,
    password,
    phone_number
    ) VALUES (?, ?, ?, ?, ?);
  `,
    [fullName, email, username, password, phoneNumber]
  );
};

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
  getUserById,
  appDataSource,
  createUser,
};
