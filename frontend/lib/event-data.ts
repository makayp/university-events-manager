'server-only';

import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { DBEvent, DBUser, Event, GetUserEventsProps } from './declaration';
import { filterEvents } from './utils';

export async function getEvents({
  limit,
  query,
  page,
  field,
}: {
  limit: number;
  query?: string;
  page?: number;
  field?: string;
}) {
  try {
    let res;

    if (query)
      res = await fetch(
        `${process.env.SERVER_ENDPOINT}/events/search?text=${query}&field=${field}&per_page=${limit}`
      );
    else
      res = await fetch(
        `${process.env.SERVER_ENDPOINT}/events/upcoming?per_page=${limit}&page=${page}`
      );

    const data: DBEvent = await res.json();

    if (!res.ok) return { error: 'Something went wrong. Please try again' };

    return {
      events: filterEvents(data.events, 'upcoming'),
      totalPages: data.pagination.total_pages,
    };
  } catch (error) {
    console.log(error);
    return {
      error: 'Server error. Please try again later.',
    };
  }
}

export async function getEventById(id: string) {
  let data: { event: Event; registered_users: DBUser[] };
  let res;
  try {
    res = await fetch(`${process.env.SERVER_ENDPOINT}/events/${id}`);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to connect to the server. Please try again later.');
  }

  if (res?.status == 404) notFound();

  if (!res.ok) throw new Error('Something went wrong');

  data = await res.json();

  return data;
}

export async function getUserEvents({
  limit = 10,
  page = 1,
  status = 'all',
  type,
}: GetUserEventsProps) {
  const session = await auth();

  const eventToGet = type === 'created' ? 'user_created_events' : 'registered';

  if (!session) {
    console.log('no session');
    return { events: [], totalPages: 0 };
  }

  try {
    const res = await fetch(
      `${process.env.SERVER_ENDPOINT}/events/${eventToGet}?page=${page}&per_page=${limit}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );

    const data: DBEvent = await res.json();

    if (res.status == 404) return { events: [], totalPages: 0 };

    if (!res.ok) throw Error;

    const filteredEvents = filterEvents(data.events, status);

    return { events: filteredEvents, totalPages: data.pagination.total_pages };
  } catch (error) {
    console.log(error);
    throw Error('Something went wrong. Please try again');
  }
}

export async function checkIsRegistered({ eventId }: { eventId: string }) {
  const session = await auth();

  if (!session) {
    return false;
  }

  const registeredEvents: { events: Event[] } = await getUserEvents({
    type: 'rsvps',
  });

  const isRegistered = registeredEvents.events.some(
    (event) => event.id == eventId
  );

  return isRegistered;
}
