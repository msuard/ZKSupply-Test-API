const zkSensor = require('./zk-sensor/zk-sensor.service');
const decrypt = require('./decrypt/decrypt.service');

module.exports = function (app) {

  app.configure(zkSensor);
  app.configure(decrypt);

};
