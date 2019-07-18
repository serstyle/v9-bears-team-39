const mongoose = require('mongoose');

const { Schema } = mongoose;

const WikiSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Wiki = mongoose.model('wiki', WikiSchema);

module.exports = Wiki;
