// database.js
const { Sequelize } = require('sequelize');

const config = new Sequelize('loggerapp', 'postgres', 'root1234', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = config;