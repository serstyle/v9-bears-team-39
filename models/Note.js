const mongoose = require('mongoose');

const { Schema } = mongoose;

const NoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
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

const Note = mongoose.model('note', NoteSchema);

module.exports = Note;
