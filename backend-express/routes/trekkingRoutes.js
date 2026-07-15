const express = require('express');
const router = express.Router();
const TrekkingRoute = require('../models/TrekkingRoutes');
const axios = require('axios');

// Get all trekking routes
router.get('/', async (req, res) => {
  try {
    const routes = await TrekkingRoute.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single trekking route
router.get('/:id', async (req, res) => {
  try {
    const route = await TrekkingRoute.findById(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create trekking route (protected)
router.post('/', async (req, res) => {
  const route = new TrekkingRoute({
    name: req.body.name,
    distance: req.body.distance,
    duration: req.body.duration,
    difficulty: req.body.difficulty,
    elevation: req.body.elevation,
    description: req.body.description,
    waypoints: req.body.waypoints
  });

  try {
    const newRoute = await route.save();
    res.status(201).json(newRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Google Maps Proxy Endpoint
router.get('/maps-proxy/:routeId', async (req, res) => {
  try {
    const route = await TrekkingRoute.findById(req.params.routeId);
    if (!route) return res.status(404).json({ message: 'Route not found' });

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=geometry`
    );
    
    res.json({
      mapData: response.data,
      waypoints: route.waypoints
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;