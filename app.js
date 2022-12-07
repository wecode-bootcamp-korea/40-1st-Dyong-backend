const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DataSource } = require('typeorm');

dotenv.config();

const app = express();

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

appDataSource
  .initialize()
  .then(() => {
    console.log('data has been initialized!');
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

app.post('/login', async (req, res, next) => {
  const { id, password } = req.body;
  if (!id || !password) {
    const error = new Error('WRONG INPUT');
    error.statusCode = 400;
    throw error;
  }
  try {
    const user = await appDataSource.query(`
    SELECT * 
    FROM users u 
    WHERE u.username = ${id}
    `);
    if (user.length === 0) {
      return res.status(404).json({ message: 'USER_NOT_FOUND' });
    }
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (isMatch) {
      const token = jwt.sign({ id: user[0].id }, process.env.COOKIE_SECRET);
      return res.status(200).json({ accessToken: token });
    }
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

const PORT = process.env.PORT;
const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server started at ${PORT}! `);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
