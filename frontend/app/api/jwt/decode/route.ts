import jwt from 'jsonwebtoken';
import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url); // Parse the URL
  const authToken = url.searchParams.get('authToken'); // Get the token from query parameters

  if (!authToken) {
    return new Response(JSON.stringify({ error: 'No token provided' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const payload = jwt.verify(authToken, process.env.NEXTAUTH_SECRET!);

    return new Response(
      JSON.stringify({ message: 'Token verified', payload }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: 'Invalid token', err }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
