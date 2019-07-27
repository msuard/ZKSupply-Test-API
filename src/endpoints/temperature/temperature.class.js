class Service {

  constructor (app, options) {
    this.options = options || {};
    this.app = app;

  }

  async create(data, params) {

    // console.log("\nTEMPERATURE: " + data.temperature + " degC\n");
    console.log(data)
    console.log(params)

    return "OK";
  }

}

module.exports = function (app, options) {
  return new Service(app, options);
};

module.exports.Service = Service;
