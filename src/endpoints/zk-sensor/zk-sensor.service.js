// Initializes the `alert` service on path `/alert`
const getRequestHeaders = require('../../utils/headers');
const createExampleService = require('./zk-sensor.class');
const hooks = require('./zk-sensor.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our public service with any options it requires
  app.use('/zk-sensor', getRequestHeaders, createExampleService(app, options));


  // Get our initialized public service so that we can register hooks
  const exampleService = app.service('zk-sensor');

  exampleService.hooks(hooks(app));

};
