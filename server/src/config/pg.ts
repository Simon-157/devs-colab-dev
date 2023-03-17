const { Sequelize } = require('sequelize');
import pg from "pg";

 const sequelize = new Sequelize('devscolab', 'devcolab', 'devcolab', {
  host: 'localhost',
  dialect: 'postgres',
});


 export  const pool = new pg.Client({
    user: 'devcolab',
    host: 'localhost',
    database: 'devscolab',
    password: 'devcolab',
    port: 5432,
  });

  pool
  .connect()
  .then(() => console.log(" Connected to postgress"))
  .catch(err => console.log("connection error", err));




export default sequelize