import { withAuth } from 'next-auth/middleware';
import { authConfig } from './auth.config';

export default withAuth({
  ...authConfig,

  callbacks: {
    authorized({ req, token }) {
      return !!token;
    },
  },
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  matcher: ['/event/create', '/account/:path*'],
};
