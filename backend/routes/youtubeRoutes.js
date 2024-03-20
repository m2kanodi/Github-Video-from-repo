const express = require('express');
const router = express.Router();
const youtubeController = require('../controllers/youtubeController');

router.post('/upload', youtubeController.uploadVideoToYouTube);

module.exports = router;