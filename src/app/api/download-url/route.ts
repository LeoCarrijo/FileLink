// app/api/download-url/route.ts
import { NextResponse } from 'next/server';
import { r2 } from '@/app/lib/r2';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const runtime = 'nodejs';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { key } = await request.json();

    if (!key) {
      return NextResponse.json(
        { error: 'Key is required' },
        { status: 400 }
      );
    }

    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,

      ResponseContentDisposition: `attachment; filename="${key}"`,
    });

    const signedUrl = await getSignedUrl(r2, command, { expiresIn: 600 });

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error('Erro ao gerar URL de download:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar URL de download' },
      { status: 500 }
    );
  }
}