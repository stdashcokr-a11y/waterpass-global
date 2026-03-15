import { NextResponse } from 'next/server';
import { uploadToYoutube } from '@/lib/youtube';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const sectionId = formData.get('sectionId');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Temporary save file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const tempPath = path.join(process.cwd(), 'tmp', file.name);
    await fs.mkdir(path.dirname(tempPath), { recursive: true });
    await fs.writeFile(tempPath, buffer);

    // Upload to YouTube
    const videoId = await uploadToYoutube(
      tempPath,
      `WaterPass Infrastructure: ${sectionId}`,
      `Technical evidence for ${sectionId} recorded on ${new Date().toLocaleDateString()}`
    );

    // Save state persistence
    const dataPath = path.join(process.cwd(), 'data', 'videos.json');
    
    // Ensure data directory exists
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    
    let videoData = {};
    try {
      const existingData = await fs.readFile(dataPath, 'utf-8');
      videoData = JSON.parse(existingData);
    } catch (e) {}

    videoData[sectionId] = videoId;
    await fs.writeFile(dataPath, JSON.stringify(videoData, null, 2));

    // Cleanup temp file
    await fs.unlink(tempPath);

    return NextResponse.json({ success: true, videoId });
  } catch (error) {
    console.error('Upload Error:', error);
    if (error.response) {
       console.error('Full Error Response:', JSON.stringify(error.response.data, null, 2));
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
