const mongoose = require('mongoose');

const { Schema } = mongoose;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
});

const Note = mongoose.model('note', NoteSchema);

module.exports = Note;
