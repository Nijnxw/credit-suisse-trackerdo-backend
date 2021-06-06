const express = require('express');
const router = express.Router();

// Load Task Model
const Task = require('../../models/Task');
const progressController = require('../../controllers/progressController');

// @route GET api/progress/test
// @description tests progress route
// @access Public
router.get('/test', (req, res) => res.send('progress route testing!'));

module.exports = router;
