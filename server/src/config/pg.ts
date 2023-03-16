const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
