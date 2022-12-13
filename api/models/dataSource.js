const { DataSource } = require('typeorm');

const appdataSource = new DataSource({
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
})

appdataSource
.initialize()
  .then(() => {
    console.log('data has been initialized!');
  })
  .catch((err) => {
   console.log(err);
});

module.exports = appdataSource