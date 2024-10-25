import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { token: data } = await req.json();
  if (!data) {
    return NextResponse.json({ error: 'No payload provided' }, { status: 400 });
  }

  try {
    const token = jwt.sign(data, process.env.NEXTAUTH_SECRET!);
    return NextResponse.json({ token });
  } catch (err) {
    console.log('Error encoding token:', err);
    return NextResponse.json(
      { error: 'Failed to encode token' },
      { status: 500 }
    );
  }
}
