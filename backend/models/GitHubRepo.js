const mongoose = require('mongoose');

const gitHubRepoSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  repo: { type: String, required: true },
  // Define other properties as needed
});

module.exports = mongoose.model('GitHubRepo', gitHubRepoSchema);