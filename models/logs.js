// models/post.js
const { DataTypes, Sequelize } = require('sequelize');
const config = require('./../config/config');
 
const logs = config.define('logs', {
  id:{
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resourceId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.STRING,
    allowNull: false,
    // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    // // If you want to include timezone information, use the following option:
    // timezone: true,
  },
  traceId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spanId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  commit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parentResourceId: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'logs',
  schema: 'public',
  timestamps: false,
  // createdAt: 'createdAt',
  // updatedAt: 'updated_at',
});

module.exports = logs;