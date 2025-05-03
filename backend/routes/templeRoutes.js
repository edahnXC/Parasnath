const express = require('express');
const router = express.Router();
const Temple = require('../models/Temple');

// Get all temples
router.get('/', async (req, res) => {
  try {
    const temples = await Temple.find();
    res.json(temples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single temple
router.get('/:id', async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) return res.status(404).json({ message: 'Temple not found' });
    res.json(temple);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create temple (protected route)
router.post('/', async (req, res) => {
  const temple = new Temple({
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    mainImage: req.body.mainImage,
    images: req.body.images,
    history: req.body.history,
    significance: req.body.significance
  });

  try {
    const newTemple = await temple.save();
    res.status(201).json(newTemple);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;