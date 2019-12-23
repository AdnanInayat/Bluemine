const application = require('./dist');
var path = require('path');

module.exports = application;
global.appRoot = path.resolve(__dirname);
if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT || 5000),
      host: process.env.HOST,
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  application.main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
