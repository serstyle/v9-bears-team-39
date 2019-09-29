const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route POST api/users
// @desc Register new User
// @access Public

router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: 'User already exists' });
    const newUser = new User({
      name,
      email,
      password,
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            process.env.jwtSecret || config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: { id: user.id, name: user.name, email: user.email },
              });
            }
          );
        });
      });
    });
  });
});

// @route PUT api/users/:id
// @desc Update User
// @access Private

router.put('/:id', auth, async (req, res) => {
  const updateProfile = {};
  if (req.body.name) updateProfile.name = req.body.name;
  if (req.body.email) updateProfile.email = req.body.email;
  if (req.body.password) updateProfile.password = req.body.password;

  User.findOneAndUpdate(
    { _id: req.params.id, user: req.body.userid },
    { $set: updateProfile },
    { new: true }
  ).then(user => res.json(user));
});

module.exports = router;
