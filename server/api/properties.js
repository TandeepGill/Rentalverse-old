const router = require('express').Router();
const {
  models: { Property },
} = require('../db');
module.exports = router;

// GET /api/properties
router.get('/:userId', async (req, res, next) => {
  try {
    const properties = await Property.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.json(properties);
  } catch (err) {
    next(err);
  }
});
