const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api', // Remove if your backend doesn't have /api prefix
      },
    })
  );
};