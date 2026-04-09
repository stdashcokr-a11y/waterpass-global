import { NextResponse } from 'next/server';
import { getSheetData } from '@/lib/sheets';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // type will be 'seoul', 'shanghai', etc.

  if (!type) {
    return NextResponse.json({ error: 'Type is required' }, { status: 400 });
  }

  try {
    const { all } = await getSheetData();
    
    // Filter items matched with type (subject name)
    // The subject in sheet might be 'seoul', 'beijing', etc.
    const images = all
      .filter(item => 
        item.type === 'photo' && 
        item.subject.toLowerCase().replace(/\s+/g, '_') === type.toLowerCase()
      )
      .map(item => item.displayLink);

    return NextResponse.json({ images });

  } catch (error) {
    console.error('Error fetching images from sheet:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
