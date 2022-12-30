const { createApp } = require('./app');
const { appDataSource } = require('./models/appDatasource');

require('dotenv').config();

const startServer = async () => {
  const app = createApp();
  console.log(app);
  const PORT = process.env.PORT;

  await appDataSource.initialize();
  console.log('database has been initialized!');

  app.listen(PORT, () => console.log(`SERVER STARTED ON ${PORT}`));
};

startServer();
