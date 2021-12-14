const Sequelize = require('sequelize');
const db = require('../db');

const Property = db.define('video', {
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  bedroom: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  bathroom: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  sqft: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['Single-Family', 'Townhouse', 'Condo']],
    },
  },
});

// Find all properties
Property.findAllProperties = async function () {
  let result = await this.findALL();
  return result; //Will get an array of objects that needs to be cleaned up;
};

// Get a specific property
Property.findOneProperty = async function (id) {
  let result = await this.findALL({
    where: {
      propertyId: { [Sequelize.Op.eq]: id },
    },
  });
  return result;
};

// Get all properties by type
Property.findPropertiesType = async function (type) {
  let result = await this.findALL({
    where: {
      type: { [Sequelize.Op.eq]: type },
    },
  });
  return result;
};

module.exports = Property;
