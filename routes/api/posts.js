const express = require('express');

const router = express.Router();

// @route         /api/posts
// @description   to get list of all posts
// @access        Public
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;
