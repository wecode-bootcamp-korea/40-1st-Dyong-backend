const { signUpService } = require('../services/userService.js')


const signUp = async(req,res) => {
  const { full_name, email, username, password, phone_number } = req.body;
  //console.log(req)

  if ( !full_name || !email || !username || !password || !phone_number ){
    const error = new Error('KEY_ERROR')
    error.statusCode = 400
    throw error
  }

  const insertId = await signUpService (full_name, email, username, password, phone_number)
  
  res.status(201).json({ insertId });
}

module.exports = {
  signUp
}