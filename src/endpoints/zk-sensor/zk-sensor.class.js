class Service {

  constructor (app, options) {
    this.options = options || {};
    this.app = app;

  }

  async create(data, params) {

    // console.log("\nTEMPERATURE: " + data.temperature + " degC\n");
    console.log("\nReceived encrypted temperature data point:\n --> c1 = " + data.c1 + "\n --> c2 = " + data.c2)

    return 200;
  }

}

module.exports = function (app, options) {
  return new Service(app, options);
};

module.exports.Service = Service;
