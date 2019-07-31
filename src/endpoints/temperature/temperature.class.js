class Service {

  constructor (app, options) {
    this.options = options || {};
    this.app = app;

  }

  async create(data, params) {

      console.log("\nReceived temperature data point: T=" + data.temperature)

      return 200;



  }

}

module.exports = function (app, options) {
  return new Service(app, options);
};

module.exports.Service = Service;
