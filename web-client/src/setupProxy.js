// @ts-ignore
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api/auth/*',
    createProxyMiddleware({
      target: process.env.AUTH_SERVICE_URL,
    }),
  );

  app.use(
    '/api/profile*',
    createProxyMiddleware({
      target: process.env.PROFILE_SERVICE_URL,
    }),
  );

  app.use(
    '/api/order*',
    createProxyMiddleware({
      target: process.env.BOOKING_SERVICE_URL,
    }),
  );
};
