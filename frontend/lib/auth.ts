import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { CustomJWTPayload } from './declaration';

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function encode(
  payload: CustomJWTPayload | undefined
): Promise<string> {
  if (!payload) return '';
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(secret);
}

export async function decode(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('Invalid token');
    return null;
  }
}
