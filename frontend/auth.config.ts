import { NextAuthOptions } from 'next-auth';
import jwt from 'jsonwebtoken';
import { SessionUser } from './lib/declaration';

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
    //verifyRequest: '/verify-email',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as SessionUser;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 14,
  },
  jwt: {
    async encode({ secret, token }) {
      return jwt.sign(token!, secret);
    },
    async decode({ token }) {
      let decoded;
      try {
        const res =
          await fetch(`${process.env.NEXTAUTH_URL}/api/jwt/decode?authToken=${token}
`);

        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        decoded = data.payload;
      } catch (err) {
        console.log('error decoding token', err);
        return null;
      }
      return decoded;
    },
  },
} satisfies NextAuthOptions;
