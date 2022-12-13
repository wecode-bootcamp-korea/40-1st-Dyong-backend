const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./router');
const { errorHandler } = require('./middlewares/error-handling');

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(routes);
app.use(errorHandler);

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
