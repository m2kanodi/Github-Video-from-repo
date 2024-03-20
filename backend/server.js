const express = require('express');
const app = express();
const PORT = process.env.PORT || 5006;
const mongoose = require('mongoose');
app.use(express.json());
const githubRoutes = require('./routes/githubRoutes.js');
const youtubeRoutes = require('./routes/youtubeRoutes.js');
const videoRoutes = require('./routes/videoRoutes')
app.use('/api/github', githubRoutes);
app.use('/api/youtube', youtubeRoutes);
app.use('/api/video', videoRoutes);
mongoose.connect('mongodb+srv://manavkanodia5:DoraManav13@cluster0.7jhrvzn.mongodb.net/')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));


