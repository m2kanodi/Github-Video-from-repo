// utils/videoUtils.js
const fs = require('fs');
const { spawn } = require('child_process');
const axios = require('axios');

// Function to generate video from GitHub repository
exports.generateVideoFromRepository = async (owner, repo) => {
    try {
      // Fetch repository data from GitHub API
      console.log('Fetching repository data from GitHub API...');
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
      const repositoryData = response.data;
      console.log('Repository data fetched successfully:', repositoryData);
  
      // Process repository data to generate video content
      console.log('Generating video content...');
      const videoContent = generateVideoContent(repositoryData);
      console.log('Video content generated:', videoContent);
  
      // Write video content to a text file
      console.log('Writing video content to text file...');
      const textFilePath = 'content.txt';
      fs.writeFileSync(textFilePath, videoContent);
          // Log content of content.txt
    console.log('Content of content.txt:', fs.readFileSync(textFilePath, 'utf-8'));
 

      console.log('Video content written to text file:', textFilePath);
  
      // Generate video using ffmpeg
      console.log('Generating video using ffmpeg...');
      const outputFilePath = 'output.mp4';

      console.log('Executing ffmpeg command...');
      
      const ffmpegCommand = [
        'ffmpeg',
        '-y',
        '-f', 'concat',
        '-safe', '0',
        '-i', textFilePath,
        //  '-vf', `drawtext=fontfile=/path/to/font.ttf:text='%{(}\\\\:txt='`,
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-f', 'mp4', // Specify the output format
        '-' // Use pipe output to write to stdout
      ];
      
      console.log('FFmpeg command:', ffmpegCommand.join(' ')); // Log the ffmpeg command
      
      const ffmpegProcess = spawn('ffmpeg', ffmpegCommand);
      
      // Create a writable stream to save the video output
      const outputStream = fs.createWriteStream(outputFilePath);
      
      // Pipe the FFmpeg output to the writable stream
      ffmpegProcess.stdout.pipe(outputStream);
      
  
      // Handle ffmpeg process events
      ffmpegProcess.on('error', (err) => {
        console.error('Failed to generate video:', err);
        throw err;
      });
      ffmpegProcess.stderr.on('data', (data) => {
        console.error('FFmpeg stderr:', data.toString());
      });
  
      ffmpegProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Video generation completed successfully');
        } else {
          console.error(`Video generation process exited with code ${code}`);
          throw new Error(`Video generation process exited with code ${code}`);
        }
      });
  
      // Return file path of generated video
      return outputFilePath;
    } catch (error) {
      throw new Error(`Failed to generate video from repository: ${error.message}`);
    }
  };
// Function to generate video content from repository data
// function generateVideoContent(repositoryData) {
//   // Extract relevant information from repository data
//   const { name, description, html_url, owner } = repositoryData;
//   const repositoryInfo = `Repository Name: ${name}\nDescription: ${description}\nURL: ${html_url}\nOwner: ${owner.login}`;

//   // Generate placeholder video content
//   const introText = `Welcome to the ${name} repository on GitHub!`;
//   const repoInfoText = `This repository contains: ${description}`;
//   const outroText = `Visit ${html_url} to explore the repository.`;

//   // Combine intro, repository info, and outro texts
//   const videoContent = `${introText}\n\n${repoInfoText}\n\n${repositoryInfo}\n\n${outroText}`;

//   // Return video content
//   return videoContent;
// }
// function generateVideoContent(repositoryData) {
//     const { name, description, html_url, owner } = repositoryData;
//     const repositoryInfo = `Repository Name: ${name}\nDescription: ${description}\nURL: ${html_url}\nOwner: ${owner.login}`;
  
//     // Generate placeholder video content as separate files
//     const introTextFile = `file 'intro.txt'`;
//     const repoInfoTextFile = `file 'repo_info.txt'`;
//     const repositoryInfoTextFile = `file 'repo_details.txt'`;
//     const outroTextFile = `file 'outro.txt'`;
  
//     // Create the separate text files
//     fs.writeFileSync('intro.txt', `Welcome to the ${name} repository on GitHub!`);
//     fs.writeFileSync('repo_info.txt', `This repository contains: ${description}`);
//     fs.writeFileSync('repo_details.txt', repositoryInfo);
//     fs.writeFileSync('outro.txt', `Visit ${html_url} to explore the repository.`);
  
//     // Combine the file entries into a single video content
//     const videoContent = `${introTextFile}\n${repoInfoTextFile}\n${repositoryInfoTextFile}\n${outroTextFile}`;
  
//     return videoContent;
//   }
  function generateVideoContent(repositoryData) {
    const { name, description, html_url, owner } = repositoryData;
    const repositoryInfo = `Repository Name: ${name}\nDescription: ${description}\nURL: ${html_url}\nOwner: ${owner.login}`;
  
    // Generate placeholder video content as separate files
    const introText = `Welcome to the ${name} repository on GitHub!`;
    const repoInfoText = `This repository contains: ${description}`;
    const outroText = `Visit ${html_url} to explore the repository.`;
  
    // Create the separate text files
    fs.writeFileSync('intro.txt', introText);
    fs.writeFileSync('repo_info.txt', repoInfoText);
    fs.writeFileSync('repo_details.txt', repositoryInfo);
    fs.writeFileSync('outro.txt', outroText);
  
    // Combine the file entries into a single video content
    const videoContent = `file 'intro.txt'\nfile 'repo_info.txt'\nfile 'repo_details.txt'\nfile 'outro.txt'`;
  
    return videoContent;
  }