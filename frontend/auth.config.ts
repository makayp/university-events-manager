import { NextAuthOptions } from 'next-auth';
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
    async encode({ token }) {
      let encodedToken;
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/jwt/encode`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        encodedToken = data.token;
      } catch (err) {
        console.log('Error encoding token', err);
        return null;
      }
      return encodedToken;
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
