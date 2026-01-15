import { NextRequest, NextResponse } from 'next/server';
import { imageRepository } from '@/lib/db/image-repository';
import { extractImageMetadata } from '@/lib/utils/image-metadata';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  const search = searchParams.get('search');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  try {
    if (search) {
      const results = await imageRepository.searchImages(search);
      return NextResponse.json({ images: results });
    }

    if (startDate && endDate && userId) {
      const stats = await imageRepository.getImageStats(userId, startDate, endDate);
      return NextResponse.json({ stats });
    }

    if (userId) {
      const images = await imageRepository.findImagesByUser(userId);
      return NextResponse.json({ images });
    }

    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const filePath = formData.get('path') as string;

    if (!filePath) {
      return NextResponse.json({ error: 'File path required' }, { status: 400 });
    }

    const metadata = await extractImageMetadata(filePath);

    return NextResponse.json({
      success: true,
      metadata
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
}
