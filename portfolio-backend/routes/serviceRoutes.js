const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new service
router.post('/', async (req, res) => {
  const service = new Service({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image || '',
    link: req.body.link || '',
    price: req.body.price,
    icon: req.body.icon || 'Palette',
    features: req.body.features || [],
    tags: req.body.tags || [],
    status: req.body.status || 'active'
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update service
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Update all fields
    service.title = req.body.title || service.title;
    service.category = req.body.category || service.category;
    service.description = req.body.description || service.description;
    service.image = req.body.image !== undefined ? req.body.image : service.image;
    service.link = req.body.link !== undefined ? req.body.link : service.link;
    service.price = req.body.price || service.price;
    service.icon = req.body.icon || service.icon;
    service.features = req.body.features || service.features;
    service.tags = req.body.tags || service.tags;
    service.status = req.body.status || service.status;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE service
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.deleteOne();
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;