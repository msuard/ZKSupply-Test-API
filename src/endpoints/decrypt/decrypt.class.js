const ElGamal = require('../../services/crypto/elgamal');
const TemperatureController = require('../../controllers/temperature');

const p = "28365527646097161458413738661957691010692997400282407966999417053192505626062757891471789344147539809945735410263785341914920216315583322460021021710065659202392602403625751569884584203861667996709255125985366483644600954536323631054809738667270692943775403308220798062429774145758205264185597632397493593131386892913441784136417996817111475164695825929714227364062937920495458772657467672269767540092857933103122263952766469657148831891639018631897214015217747121389035422872347859768051933749072523271137736650694505825523713129367528228940317820178256623512044793535146342932459887854447594707146468574979426912067";

class Service {

  constructor (app, options) {
    this.options = options || {};
    this.app = app;

  }

  async create(data, params) {

    if (data.sensor_id && data.dataset_id && data.decryption_key && data.data_type === "temperature") {

      console.log("\nDecrypting temperature data set...");

      const data_set = await TemperatureController.getDataset(data.sensor_id, data.dataset_id);

      const encrypted_data_set = data_set.data;

      let plaintext_data_set = [];

      encrypted_data_set.forEach((item) => {

        let temp = ElGamal.decryptMessage(item.c1, item.c2, data.decryption_key, p)
        plaintext_data_set.push({
          timestamp: item.timestamp,
          temperature: temp.substr(0,2) + "." + temp.substr(2,5)
        });
      });

      return {
        timestamp: Date.now(),
        data_type: "temperature",
        sensor_id: data.sensor_id,
        dataset_id: data.dataset_id,
        data: plaintext_data_set
      };

    }

  }

  async find(params){

    if(params.query.data_type === "temperature"){
      return await TemperatureController.getDataset(params.query.sensor_id, params.query.dataset_id);
    }


  }

}

module.exports = function (app, options) {
  return new Service(app, options);
};

module.exports.Service = Service;
