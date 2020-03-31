const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route POST api/users
// @desc Register
// @access Public
router.post(
  '/',
  [
    check('name', 'Enter a name')
      .not()
      .isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check(
      'password',
      'Enter a password with at least 6 characters long'
    ).isLength({ min: 6 }),
    check(
      'password',
      'Enter a password with at max 8 characters long'
    ).isLength({ max: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ msg: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);

      user = new User({
        name,
        email,
        password: await bcrypt.hash(password, salt)
      });

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtsecret'),
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
