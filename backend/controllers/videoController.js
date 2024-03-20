const { generateVideoFromRepository } = require('../utils/videoUtils');
exports.generateVideoFromRepository = async (req, res) => {
    try {
      const { owner, repo } = req.params;
      // Generate video from repository using custom logic
      const videoFilePath = await generateVideoFromRepository(owner, repo);
      // Return video file path
      res.json({ videoFilePath });
    } catch (error) {
      console.error('Failed to generate video from repository:', error.message);
      res.status(500).json({ error: 'Failed to generate video from repository' });
    }
  };
  