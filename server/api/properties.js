const router = require('express').Router();
const {
  models: { Property },
} = require('../db/index.js');
module.exports = router;

// GET /api/properties
router.get('/:propertyId', async (req, res, next) => {
  try {
    const property = await Property.findByPk(req.params.propertyId);
    res.json(property);
  } catch (err) {
    next(err);
  }
});
