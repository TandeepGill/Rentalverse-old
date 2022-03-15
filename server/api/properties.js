const router = require('express').Router();
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
    const property = await Property.findByPk(req.params.propertyId);

    res.json(property);
  } catch (err) {
    next(err);
  }
});

// GET /api/properties --> Gets a single property's lease based on Property ID.
router.get('/:propertyId/lease', async (req, res, next) => {
  try {
    const lease = await Lease.findOne({
      where: {
        propertyId: req.params.propertyId,
        isCurrentTenant: true,
      },
    });

    if (lease === null) {
      return new Error('No lease information found.');
    }

    res.json(lease);
  } catch (err) {
    next(err);
  }
});

// POST /api/properties --> Creates a new property for a user based on User ID.
router.post('/new/:userId', async (req, res, next) => {
  try {
    const property = { ...req.body };
    let combinedAddress = `${property.addressLineOne}\n${property.addressLineTwo}`;

    const newProperty = {
      type: property.type,
      address: combinedAddress,
      bedroom: property.bedroom,
      bathroom: property.bathroom,
      sqft: property.sqft,
      imageURL: property.imageURL,
    };

    const createdProperty = await Property.create({
      ...newProperty,
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

// DELETE /api/properties --> Deletes a single property and all associated leases based on Property ID.
router.delete('/:propertyId/delete', async (req, res, next) => {
  try {
    await Lease.destroy({
      where: {
        propertyId: req.params.propertyId,
      },
    });

    await Property.destroy({
      where: {
        id: req.params.propertyId,
      },
    });

    res.json();
  } catch (err) {
    next(err);
  }
});
