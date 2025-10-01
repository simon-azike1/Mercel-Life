const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// GET all services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single service
router.get('/services/:id', async (req, res) => {
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
router.post('/services', async (req, res) => {
  const service = new Service({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    icon: req.body.icon || 'Palette',
    features: req.body.features || [],
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
router.put('/services/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.title = req.body.title || service.title;
    service.description = req.body.description || service.description;
    service.price = req.body.price || service.price;
    service.icon = req.body.icon || service.icon;
    service.features = req.body.features || service.features;
    service.status = req.body.status || service.status;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE service
router.delete('/services/:id', async (req, res) => {
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