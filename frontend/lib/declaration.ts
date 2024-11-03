import { JWTPayload } from 'jose';
import { User, type DefaultSession } from 'next-auth';

export interface SessionUser {
  id: string;
  email: string;
  image: string;
  emailVerified: Date | null;
  first_name: string;
  last_name: string;
  accessToken: string;
}

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session {
    user: SessionUser & DefaultSession['user'];
  }

  export interface User extends SessionUser {}
}

export type CustomJWTPayload = JWTPayload & User;

export type EventData = {
  id: number;
  title: string;
  description: string;
  location: string;
  organiser: string;
  image: string;
  start_date: string;
  end_date: string;
  url: '';
};

export type DBUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  image: string;
};
