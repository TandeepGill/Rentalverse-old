const router = require('express').Router();
const {
  models: { Property },
} = require('../db/index.js');
module.exports = router;

// GET /api/properties
router.get('/:propertyId', async (req, res, next) => {
  try {
    const sqftFormat = (sqft) => {
      if (sqft.length < 4) {
        return sqft;
      } else {
        let firstNum = sqft[0];
        return `${firstNum},${sqft.slice(1)}`;
      }
    };

    const property = await Property.findByPk(req.params.propertyId);

    let sqftWithComma = sqftFormat(property.dataValues.sqft);

    res.json({ ...property.dataValues, sqft: sqftWithComma });
  } catch (err) {
    next(err);
  }
});
