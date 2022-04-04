const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evacueesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  evacuation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evacuation',
  },
});

module.exports = mongoose.model('Evacuees', evacueesSchema);
