const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const { appDataSource, getUserById } = require('./models/userDao.js');
const router = require('./router');

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(router);

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
