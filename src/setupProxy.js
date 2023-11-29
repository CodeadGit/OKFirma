const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

  app.use(
    '/para-birimleri.json',
    createProxyMiddleware({
      target: 'https://api.genelpara.com/embed/',
      changeOrigin: true,
    })
  );
//   app.use(
//     '/GetInstallments',
//     createProxyMiddleware({
//       target: 'https://posservice.esnekpos.com/api/services/',
//       changeOrigin: true,
      
//     })
//   );
};
