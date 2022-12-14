const bcrypt = require('bcrypt')
const { getUserById } = require('../models/userDao');
const { createUser } = require('../models/userDao')
const jwt = require('jsonwebtoken');

const hashPassword = async(password) => {
  const saltRounds = 12;
  
  return await bcrypt.hash(password, saltRounds);
}

const signUpService = async(fullName, email, username, password, phoneNumber) => {
  const emailRegex =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,r3}$/;
	const passwordRegex =/^[a-z0-9_]{4,20}$/;
	const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;

	if ( !fullName || !email || !username || !password || !phoneNumber ) {
		const error = new Error('KEY_ERROR');
		error.statusCode = 400;

		throw error
	}
	
	if (!emailRegex.test(email)) {
		const error = new Error('INVALID_EMAIL');
		error.statusCode = 400;

		throw error
	}

  if (!passwordRegex.test(password)) {
		const error = new Error('INVALID_PASSWORD');
		error.statusCode = 400;

		throw error
	}

	if (!phoneNumberRegex.test(phoneNumber)) {
		const error = new Error('INVALID_PHONE_NUMBER');
		error.statusCode = 400;

		throw error
	}
    
  const hashedPassword = await hashPassword(password)

  return await createUser(fullName, email, username, hashedPassword, phoneNumber)
}

const signInService = async( username, password ) =>{
  
  if (!username || !password) {
    const error = new Error('WRONG_INPUT');
    error.statusCode = 400;

    throw error;
  }

  const user = await getUserById (username);
  
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

  const token = jwt.sign({ username: user[0].username }, process.env.JWT_SECRET);

  return token
}


module.exports = {
  signUpService,
  signInService
};
