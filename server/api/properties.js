const router = require('express').Router();
const sequelize = require('sequelize');
const {
  models: { Property, Lease },
} = require('../db/index.js');
module.exports = router;

// GET /api/properties
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

// GET /api/properties
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
      },
      order: [['startDate', 'DESC']],
    });

    if (lease === null) {
      return new Error(
        'There is no lease information available about this property. Please add a tenant.'
      );
    }

    let priceWithComma = numFormat(lease.dataValues.price.toString());

    let currentLease = { ...lease.dataValues };

    const leaseDetails = { ...currentLease, price: priceWithComma };

    res.json(leaseDetails);
  } catch (err) {
    next(err);
  }
});

// POST /api/properties
router.post('/new/:userId', async (req, res, next) => {
  try {
    const createdProperty = await Property.create({
      ...req.body,
      userId: req.params.userId,
    });
    res.send(createdProperty);
  } catch (error) {
    next(error);
  }
});

// POST /api/properties
router.post('/:propertyId/lease/new/:userId', async (req, res, next) => {
  try {
    const createdLease = await Lease.create({
      ...req.body,
      propertyId: req.params.propertyId,
      userId: req.params.userId,
    });
    res.send(createdLease);
  } catch (error) {
    next(error);
  }
});
