const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
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

app.post('/signin', async (req, res, next) => {
  const { full_name, username, email, password, phone_number } =req.body
  await appDataSource.query(
  `INSERT INTO users(
    full_name,
    username,
    email,
    password,
    phone_number
    ) VALUES (?, ?, ?, ?, ?);
    `,
      [ full_name, username, email, password, phone_number ]
  );
   res.status(201).json( { message : ' WELCOME TO JOIN OUR WEB SITE! '});
})

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
