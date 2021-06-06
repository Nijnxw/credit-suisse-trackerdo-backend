const express = require('express');
const router = express.Router();

// Load Progress Controller
const progressController = require('../../controllers/progressController');

// @route GET api/progress/test
// @description tests progress route
// @access Public
router.get('/test', (req, res) => res.send('progress route testing!'));

// @route GET api/progress
// @description Get all tasks
// @access Public
router.get('/statistics', progressController.getStatistics);

module.exports = router;
