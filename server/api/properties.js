const router = require('express').Router();
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
    const lease = await Lease.findAll({
      where: {
        propertyId: req.params.propertyId,
      },
    });

    let sqftWithComma = numFormat(property.dataValues.sqft);
    let priceWithComma = numFormat(lease[0].dataValues.price.toString());

    let currentProperty = property.dataValues;
    let currentLease = { ...lease[0].dataValues };

    const propertyDetails = { ...currentProperty, sqft: sqftWithComma };
    const leaseDetails = { ...currentLease, price: priceWithComma };

    res.json({ propertyDetails: propertyDetails, leaseDetails: leaseDetails });
  } catch (err) {
    next(err);
  }
});
