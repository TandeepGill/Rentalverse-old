const Sequelize = require('sequelize');
const db = require('../db');

const Lease = db.define('lease', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isCurrentTenant: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Lease;
