import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'videos.json');
    const existingData = await fs.readFile(dataPath, 'utf-8');
    const videoData = JSON.parse(existingData);
    
    return NextResponse.json(videoData);
  } catch (error) {
    // If file doesn't exist, return empty object
    return NextResponse.json({});
  }
}
