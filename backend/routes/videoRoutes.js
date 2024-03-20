const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/generate/:owner/:repo', videoController.generateVideoFromRepository);

module.exports = router;