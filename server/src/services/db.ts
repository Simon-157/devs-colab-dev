const sequelize = require('../config/pg');
const { client } = require('../config/redis');

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connection has been established successfully.');

    client.on('connect', () => {
      console.log('Redis client connected');
    });

    client.on('error', (err: any) => {
      console.log(`Error: ${err}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connect();
