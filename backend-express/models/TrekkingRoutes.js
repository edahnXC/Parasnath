const mongoose = require('mongoose');

const trekkingRouteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Moderate', 'Difficult'],
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  startingPoint: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  waypoints: [
    {
      name: String,
      description: String,
      coordinates: {
        lat: Number,
        lng: Number
      },
      images: [String]
    }
  ],
  mainImage: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TrekkingRoute', trekkingRouteSchema);