const example = require('./example/example.service');
const temperature = require('./temperature/temperature.service');
const zkSensor = require('./zk-sensor/zk-sensor.service');

module.exports = function (app) {
  app.configure(example);
  app.configure(temperature);
  app.configure(zkSensor);

};
