const router = require('express').Router();
const sequelize = require('sequelize');
const {
  models: { Property, Lease },
} = require('../db/index.js');
module.exports = router;

// GET /api/properties --> Gets all properties based on User ID.
router.get('/', async (req, res, next) => {
  try {
    const properties = await Property.findAll({
      where: {
        userId: req.query.userId,
      },
    });
    res.json(properties);
  } catch (err) {
    next(err);
  }
});

// GET /api/properties --> Gets a single property based on Property ID.
router.get('/:propertyId', async (req, res, next) => {
  try {
    const numFormat = (num) => {
      if (num.length < 4) {
        return num;
      } else {
        let firstNum = num[0];
        return `${firstNum},${num.slice(1)}`;
      }
    };

    const property = await Property.findByPk(req.params.propertyId);

    let sqftWithComma = numFormat(property.dataValues.sqft);

    let currentProperty = property.dataValues;

    const propertyDetails = { ...currentProperty, sqft: sqftWithComma };

    res.json(propertyDetails);
  } catch (err) {
    next(err);
  }
});

// GET /api/properties --> Gets a single property's lease based on Property ID.
router.get('/:propertyId/lease', async (req, res, next) => {
  try {
    const numFormat = (num) => {
      if (num.length < 4) {
        return num;
      } else {
        let firstNum = num[0];
        return `${firstNum},${num.slice(1)}`;
      }
    };

    const lease = await Lease.findOne({
      where: {
        propertyId: req.params.propertyId,
        isCurrentTenant: true,
      },
    });

    if (lease === null) {
      return new Error('No lease information found.');
    }

    let priceWithComma = numFormat(lease.dataValues.price.toString());

    let currentLease = { ...lease.dataValues };

    const leaseDetails = { ...currentLease, price: priceWithComma };

    res.json(leaseDetails);
  } catch (err) {
    next(err);
  }
});

// POST /api/properties --> Creates a new property for a user based on User ID.
router.post('/new/:userId', async (req, res, next) => {
  try {
    const createdProperty = await Property.create({
      ...req.body,
      userId: req.params.userId,
    });
    res.json(createdProperty);
  } catch (error) {
    next(error);
  }
});

// POST /api/properties --> Creates a new lease for a property based on Property ID and adds User ID to entry.
router.post('/:propertyId/lease/new/:userId', async (req, res, next) => {
  try {
    const leaseDetails = { ...req.body };
    leaseDetails.isCurrentTenant = true;

    const createdLease = await Lease.create({
      ...leaseDetails,
      propertyId: req.params.propertyId,
      userId: req.params.userId,
    });
    res.json(createdLease);
  } catch (error) {
    next(error);
  }
});
