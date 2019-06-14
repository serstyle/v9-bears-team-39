const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const notes = require('./routes/api/notes');
const todos = require('./routes/api/todos');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

// Bodyparser Middleware
app.use(express.json());

const db = config.get('mongoURI');

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
  }) // Adding new Mongo url parser
  .then(() => console.log('connect to mongoDB'))
  .catch(err => console.log(err));

// Routes

app.use('/api/todos', todos);
app.use('/api/notes', notes);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.listen(process.env.PORT || 5000, () => {
  console.log('server start');
});
