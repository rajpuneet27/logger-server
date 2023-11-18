const { Sequelize, DataTypes } = require('sequelize');

// Sequelize (SQL database) setup
const sequelize = new Sequelize('your_database', 'your_user', 'your_password', {
    host: 'localhost',
    dialect: 'mysql', // Use the appropriate dialect for your database
  });

// Define a model for your logs in SQL database
const Log = sequelize.define('Log', {
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
      type: DataTypes.DATE,
      allowNull: false,
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
});

// Sync the SQL database
sequelize.sync({ force: false })
  .then(() => {
    console.log('SQL database synced');
  })
  .catch(err => {
    console.error('Error syncing SQL database:', err);
  });

//Model
const CartItems = mongoose.model('CartItems', CartItemsSchema);

module.exports = logs;