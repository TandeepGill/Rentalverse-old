//this is the access point for all things database related!

const User = require('./models/User');
const Property = require('./models/Property');
const Lease = require('./models/Lease');

const db = require('./db');

//associations could go here!

// User has many Properties and many Properties belong to User
User.hasMany(Property);
Property.belongsTo(User);

Property.hasOne(Lease);
Lease.belongsTo(Property);

User.hasMany(Lease);

module.exports = {
  db,
  models: {
    User,
    Property,
    Lease,
  },
};
