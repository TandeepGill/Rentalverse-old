const router = require('express').Router();
const {
  models: { Property, Lease },
} = require('../db/index.js');
module.exports = router;

// GET /api/tenants
router.get('/:userId', async (req, res, next) => {
  try {
    const numFormat = (num) => {
      if (num.length < 4) {
        return num;
      } else {
        let firstNum = num[0];
        return `${firstNum},${num.slice(1)}`;
      }
    };

    const leases = await Lease.findAll({
      where: {
        userId: req.params.userId,
      },
      include: Property,
    });

    leases.forEach(
      (lease) =>
        (lease.dataValues.price = numFormat(lease.dataValues.price.toString()))
    );
    leases.forEach(
      (lease) =>
        (lease.dataValues.property.sqft = numFormat(
          lease.dataValues.property.sqft
        ))
    );

    res.json(leases);
  } catch (err) {
    next(err);
  }
});
