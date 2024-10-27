import { type DefaultSession } from 'next-auth';

export interface SessionUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  password: string;
  accessToken: string;
  emailVerified: Date | null;
}

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: SessionUser & DefaultSession['user'];
  }
}
