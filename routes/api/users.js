const express = require('express');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

const router = express.Router();

// @route           /api/users
// @description     to create a new user
// @access          Public
router.post('/', [
  check('name', 'Name must be there').not().isEmpty(),
  check('email', 'Not a valid email').isEmail(),
  check('password', 'Password should contain at least of 6 characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if(user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({ name, email, password, avatar });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      await jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if(err) {
            throw err;
          }

          return res.json({ token });
        }
      );
        
    } catch(err) {
      console.log(err);
      return res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
});

module.exports = router;
