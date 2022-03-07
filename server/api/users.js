const router = require('express').Router();
const {
  models: { Property },
} = require('../db/index.js');
module.exports = router;

// GET /api/users
router.get('/:userId/properties', async (req, res, next) => {
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
