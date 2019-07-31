const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const temperatureSchema = new Schema({
  timestamp: Number,
  sensor_id: String,
  dataset_id: String,
  c1: String,
  c2: String
});

const Temperature = mongoose.model('Temperature', temperatureSchema, 'temperature');

module.exports = Temperature;