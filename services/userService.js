const bcrypt = require('bcrypt')
const { getUserById } = require('../models/userDao');
const { createUser } = require('../models/userDao')
const jwt = require('jsonwebtoken');

const hashPassword = async(password) => {
  const saltRounds = 12;
  
  return await bcrypt.hash(password, saltRounds);
}

const signUpService = async(fullName, email, username, password, phoneNumber) => {
  const hashedPassword = await hashPassword(password)

  return await createUser(fullName, email, username, hashedPassword, phoneNumber)
}

const signInService = async( id, password ) =>{
  
  if (!id || !password) {
    const error = new Error('WRONG_INPUT');
    error.statusCode = 400;
    throw error;
  }

  const user = await getUserById (id);
  
  if (user.length === 0) {
    const error = new Error('USER_NOT_FOUND');
    error.statusCode = 404;
    throw error
  }
  
  const isMatch = await bcrypt.compare(password, user[0].password);
  
  if (!isMatch) {
    const error = new Error('INVALID_USER')
    error.statusCode = 400;
    throw error
  }

  const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);

  return token
}


module.exports = {
  signUpService,
  signInService
}
