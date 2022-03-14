const router = require('express').Router();
const {
  models: { Property, Lease },
} = require('../db/index.js');
module.exports = router;

// GET /api/tenants --> Gets all tenants for a user based on User ID.
router.get('/:userId', async (req, res, next) => {
  try {
    const leases = await Lease.findAll({
      where: {
        userId: req.params.userId,
      },
      order: [['createdAt', 'ASC']],
      include: Property,
    });

    res.json(leases);
  } catch (err) {
    next(err);
  }
});

// PUT /api/tenants --> Updates a single lease based on Lease ID.
router.put('/:leaseId/edit', async (req, res, next) => {
  try {
    const lease = await Lease.findByPk(req.params.leaseId);
    await lease.update({ ...req.body });

    res.json(lease);
  } catch (err) {
    next(err);
  }
});

// PUT /api/tenants --> Updates a single to not current based on Lease ID.
router.put('/:leaseId/end', async (req, res, next) => {
  try {
    const lease = await Lease.findByPk(req.params.leaseId);
    await lease.update({ isCurrentTenant: false });

    res.json(lease);
  } catch (err) {
    next(err);
  }
});
