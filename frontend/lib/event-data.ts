'server-only';

import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { DBEvent, Event, GetRegisteredEventsProps } from './declaration';
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
  let data;
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

  return data.event;
}

export async function getRegisteredEvents({
  limit = 10,
  page,
  status = 'all',
}: GetRegisteredEventsProps) {
  const session = await auth();

  if (!session) {
    console.log('no session');
    return { events: [], totalPages: 0 };
  }

  try {
    const res = await fetch(
      `${process.env.SERVER_ENDPOINT}/events/registered?page=${page}&per_page=${limit}`,
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

    // let totalPages = Math.ceil(filteredEvents.length / limit);

    // if (page) {
    //   const start = limit * (page - 1);
    //   const end = page * limit;

    console.log(data.pagination);

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

  const registeredEvents: { events: Event[] } = await getRegisteredEvents({});

  const isRegistered = registeredEvents.events.some(
    (event) => event.id == eventId
  );

  return isRegistered;
}
