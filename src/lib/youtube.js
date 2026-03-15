import { google } from 'googleapis';
import fs from 'fs';

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);

export const uploadToYoutube = async (filePath, title, description) => {
  oauth2Client.setCredentials({
    refresh_token: process.env.YOUTUBE_REFRESH_TOKEN,
  });

  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,
  });

  const response = await youtube.videos.insert({
    part: 'snippet,status',
    requestBody: {
      snippet: {
        title: title,
        description: description,
      },
      status: {
        privacyStatus: 'unlisted', // Or 'public' depending on preference
      },
    },
    media: {
      body: fs.createReadStream(filePath),
    },
  });

  return response.data.id;
};
