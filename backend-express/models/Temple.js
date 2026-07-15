const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  mainImage: {
    type: String,
    required: true
  },
  images: [String],
  history: {
    type: String,
    required: true
  },
  significance: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Temple', templeSchema);