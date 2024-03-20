// utils/youtubeUtils.js
const { google } = require('googleapis');
const fs = require('fs');
const client_secret = require('../client_secret.json')
// Function to upload video to YouTube
exports.uploadVideoToYouTube = async (videoFilePath, title, description, tags) => {
  return new Promise((resolve, reject) => {
    // Load client secrets from a local file
    fs.readFile(client_secret, (err, content) => {
      if (err) {
        console.error('Error loading client secret file:', err);
        reject(err);
      } else {
        // Authorize a client with credentials
        authorize(JSON.parse(content), (auth) => {
          // Upload video to YouTube
          uploadVideo(auth, videoFilePath, title, description, tags)
            .then((videoUrl) => resolve(videoUrl))
            .catch((err) => reject(err));
        });
      }
    });
  });
};

// Function to authorize a client with credentials
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token
  fs.readFile('token.json', (err, token) => {
    if (err) {
      getAccessToken(oAuth2Client, callback);
    } else {
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    }
  });
}

// Function to get access token
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube.upload']
  });
  console.log('Authorize this app by visiting this URL:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error('Error retrieving access token:', err);
        return;
      }
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile('token.json', JSON.stringify(token), (err) => {
        if (err) console.error('Error writing token to file:', err);
        console.log('Token stored to token.json');
      });
      callback(oAuth2Client);
    });
  });
}

// Function to upload video to YouTube using YouTube Data API
async function uploadVideo(auth, videoFilePath, title, description, tags) {
  try {
    // Create a YouTube Data API client
    const youtube = google.youtube({
      version: 'v3',
      auth
    });

    // Upload video metadata
    const res = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title,
          description,
          tags
        },
        status: {
          privacyStatus: 'public' // Set privacy status as needed
        }
      },
      media: {
        body: fs.createReadStream(videoFilePath)
      }
    });

    // Get the video URL
    const videoId = res.data.id;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // Return the URL of the uploaded video
    return videoUrl;
} catch (error) {
  throw new Error(`Error uploading video to YouTube: ${error.message}`);
}
}