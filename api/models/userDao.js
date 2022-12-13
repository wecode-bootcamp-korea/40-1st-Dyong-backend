//const { dataSource, userDao } = require('.')
const dataSource = require('./dataSource')

const createUser = async (full_name, email, username, password, phone_number) => {
  return await dataSource.query(`
  INSERT INTO users (
    full_name,
    email,
    username,
    password,
    phone_number
    ) VALUES (?, ?, ?, ?, ?);
  `,
  [ full_name, username, email, password, phone_number ]
  )  
}

module.exports = {
  createUser
}