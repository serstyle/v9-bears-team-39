const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const notes = require('./routes/api/notes');
const todos = require('./routes/api/todos');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const wikis = require('./routes/api/wikis');

const app = express();
const corsOptions = {
  origin: 'https://dev-resources-1337.netlify.com',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
// Bodyparser Middleware
app.use(express.json());

// eslint-disable-next-line no-bitwise
<<<<<<< HEAD:server/index.js
const db = config.get('mongoURI') || process.env.mongoURI;
=======
const db = process.env.mongoURI || config.get('mongoURI');
>>>>>>> 4af10aa5fb966dbf6e2e37e1e4d588f0ef631136:index.js
app.use(morgan('combined'));
// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }) // Adding new Mongo url parser
  .then(() => console.log('connect to mongoDB'))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('ok');
});
app.use('/api/todos', todos);
app.use('/api/notes', notes);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/wikis', wikis);

// Serve static assets if in production

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log('server start');
});
