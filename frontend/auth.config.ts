import { NextAuthConfig } from 'next-auth';
import { CustomJWTPayload, SessionUser } from './lib/declaration';
import { NextResponse } from 'next/server';
import { isProtectedRoute } from './lib/utils';
import { encode, decode } from './lib/auth';
import { decodeJwt } from 'jose';

export const authConfig = {
  providers: [],
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth;
      const pathname = nextUrl.pathname;

      const isOnProtectedRoute = isProtectedRoute(pathname);

      if (isOnProtectedRoute && !isLoggedIn) {
        return false; // Redirect or deny access
      }

      if (isLoggedIn) {
        if (pathname.startsWith('/login') || pathname.startsWith('/signup'))
          return NextResponse.redirect(new URL('/', nextUrl.origin));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        const expiry = Math.floor(
          new Date(decodeJwt(user.accessToken).expiry as number).getTime() /
            1000
        );

        token.exp = expiry;
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
      const encodedToken = await encode(token as CustomJWTPayload);
      return encodedToken;
    },

    async decode({ token }) {
      const decodedToken = await decode(token!);
      return decodedToken;
    },
  },
} satisfies NextAuthConfig;
