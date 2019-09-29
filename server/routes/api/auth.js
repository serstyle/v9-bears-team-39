const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route POST api/auth
// @desc Auth user
// @access Public

router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields man' });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Validate password

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      jwt.sign(
        { id: user.id },
        process.env.jwtSecret || config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
