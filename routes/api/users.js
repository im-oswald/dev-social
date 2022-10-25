const express = require('express');

const router = express.Router();

// @route           /api/users
// @description     to list all the users
// @access          Public
router.get('/', (req, res) => res.send('Users route'));

module.exports = router;
