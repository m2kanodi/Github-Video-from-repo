const { uploadVideoToYouTube } = require('../utils/youtubeUtils');

exports.uploadVideoToYouTube = async (req, res) => {
  try {
    const { videoFilePath, title, description, tags } = req.body;
    // Upload video to YouTube using custom logic
    const videoUrl = await uploadVideoToYouTube(videoFilePath, title, description, tags);
    // Return YouTube video URL
    res.json({ videoUrl });
  } catch (error) {
    console.error('Failed to upload video to YouTube:', error.message);
    res.status(500).json({ error: 'Failed to upload video to YouTube' });
  }
};