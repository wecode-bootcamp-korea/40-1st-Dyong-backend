const { appDataSource } = require('./appDatasource');

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

const updateUserPoint = async (userId, sum) => {
  return await appDataSource.query(`
  UPDATE
      users
  SET
      point = point - ${sum}
  WHERE
      id = ${userId}
  `);
};

module.exports = {
  getUserById,
  createUser,
  updateUserPoint,
};
