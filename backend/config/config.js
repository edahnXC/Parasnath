module.exports = {
    mongoURI: process.env.MONGODB_URI,
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
  };