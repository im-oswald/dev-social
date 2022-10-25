const express = require('express');

const router = express.Router();

// @route           /api/auth
// @descriotion     to do the authentication
// @access          Private
router.get('/', (req, res) => res.send('Auth route'));

module.exports = router;
