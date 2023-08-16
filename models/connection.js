//! import the ORM
const { Sequelize } = require('sequelize');

//! connect to the database
const options = {
  host: 'localhost',
  port: 5432,
  databaseName: 'arfatsalman',
};

const connectionString = `postgres://${options.host}:${options.port}/${options.databaseName}`;

let sequelize = new Sequelize(connectionString);

module.exports = {
  sequelize,
};
