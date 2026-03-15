import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (!type) {
    return NextResponse.json({ error: 'Type is required' }, { status: 400 });
  }

  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images', type);
    
    // Check if directory exists
    if (!fs.existsSync(imagesDir)) {
      return NextResponse.json({ images: [] });
    }

    // Read all files in the directory
    const files = fs.readdirSync(imagesDir);
    
    // Filter out non-image files (just in case) and create public URLs
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => `/images/${type}/${file}`);

    return NextResponse.json({ images });

  } catch (error) {
    console.error('Error reading image directory:', error);
    return NextResponse.json({ error: 'Failed to read images' }, { status: 500 });
  }
}
