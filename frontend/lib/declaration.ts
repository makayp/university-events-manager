import { JWTPayload } from 'jose';
import { User, type DefaultSession } from 'next-auth';

export interface SessionUser extends EventUserInfo {
  id: string;
  user_id: string;
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

export interface EventUserInfo {
  email: string;
  first_name: string;
  last_name: string;
  image_url: string | null;
  user_id: string;
}

export interface EventData {
  id: string;
  event_name: string;
  description: string;
  start_time: string;
  end_time: string;
  image_url: string;
  location: string;
  url: '';
  user_info: EventUserInfo;
}

export type DBUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  image: string;
};
