const example = require('./example/example.service');
const temperature = require('./temperature/temperature.service');

module.exports = function (app) {
  app.configure(example);
  app.configure(temperature);
};
