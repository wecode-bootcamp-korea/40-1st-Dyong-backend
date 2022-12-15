const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const { imagesUpload, productsUpload } = require('./dbUploader');
const { appDataSource } = require('./dbUploader.js');

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

appDataSource
  .initialize()
  .then(async () => {
    console.log('data has been initialized!');
    imagesUpload('./mock-data/images_table.csv');
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
