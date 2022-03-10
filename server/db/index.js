//this is the access point for all things database related!

const User = require('./models/User');
const Property = require('./models/Property');
const Lease = require('./models/Lease');

const db = require('./db');

//associations could go here!

// One to Many -> One User, Many Properties
User.hasMany(Property);
Property.belongsTo(User);

// One to Many -> One Property, Many Leases
Property.hasMany(Lease);
Lease.belongsTo(Property);

// One to Many -> One User, Many Leasess
User.hasMany(Lease);

module.exports = {
  db,
  models: {
    User,
    Property,
    Lease,
  },
};
