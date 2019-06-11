const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const notes = require('./routes/api/notes');

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('connect to mongoDB'))
  .catch(err => console.log(err));

// Routes

app.use('/api/notes', notes);

app.listen(process.env.PORT || 5000, () => {
  console.log('server start');
});
