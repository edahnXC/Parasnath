const config = {
    googleMapsApiKey: process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_GOOGLE_MAPS_API_KEY_PROD
      : process.env.REACT_APP_GOOGLE_MAPS_API_KEY_DEV,
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || '/api'
  };
  
  export default config;