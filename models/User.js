const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
