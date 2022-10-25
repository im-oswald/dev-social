const express = require('express');
const auth = require('../../middlewares/auth');
const User = require('../../models/User');

const router = express.Router();

// @route           /api/auth
// @descriotion     to do the authentication
// @access          Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    return res.json({ user });
  } catch(err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

module.exports = router;
