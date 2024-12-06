import { JWTPayload } from 'jose';
import { User, type DefaultSession } from 'next-auth';

export interface DBUser {
  user_id: string;
  email: string;
  image_url: string;
  first_name: string;
  last_name: string;
}

export interface SessionUser extends DBUser {
  id: string;
  emailVerified: Date | null;
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

export interface EventOrganiser {
  email: string;
  first_name: string;
  last_name: string;
  image_url: string | null;
  user_id: string;
}

export interface Event {
  id: string;
  event_name: string;
  description: string;
  start_time: string;
  end_time: string;
  image_url: string;
  location: string;
  url: '';
  total_registered: number;
  user_info: EventOrganiser;
}

// export type FilteredEvents = {
//   past: Event[];
//   ongoing: Event[];
//   upcoming: Event[];
//   active: Event[];
// };

export type EventFilterProps =
  | 'all'
  | 'active'
  | 'past'
  | 'ongoing'
  | 'upcoming';

export type EventStatusProps = 'past' | 'ongoing' | 'upcoming';

export type GetUserEventsProps = {
  limit?: number;
  page?: number;
  status?: EventFilterProps;
  type: 'created' | 'rsvps';
};

export type DBEvent = { events: Event[]; pagination: { total_pages: number } };

export type EventTableProps = {
  currentPage: number;
  eventStatus: EventStatusProps;
};
