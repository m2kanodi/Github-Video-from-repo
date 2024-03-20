const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController.js');

router.get('/repositories/:owner/:repo', githubController.fetchRepositoryData);

module.exports = router;