const mongoose = require('mongoose');

const { Schema } = mongoose;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  started: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Date,
  },
});

const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;
