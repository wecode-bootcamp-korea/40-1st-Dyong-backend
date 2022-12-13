const bcrypt = require('bcrypt')

const { createUser } = require('../models/userDao.js')

const hashPassword = async(password) => {
  const saltRounds = 12;
  
  return await bcrypt.hash(password, saltRounds);
}

const signUpService = async(full_name, email, username, password, phone_number) => {
  const hashedPassword = await hashPassword(password)

  return await createUser(full_name, email, username, hashedPassword, phone_number)
}


module.exports = {
  signUpService
}
