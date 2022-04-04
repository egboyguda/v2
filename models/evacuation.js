const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evacuationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  space: {
    type: Number,
  },
  address: {
    type: String,
    required: true,
  },

  location: {
    type: { type: String },
    coordinates: { latitude: Number, longitude: Number },
  },
});

module.exports = mongoose.model('Evacuation', evacuationSchema);
