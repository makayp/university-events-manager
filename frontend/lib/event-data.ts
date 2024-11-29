'server-only';

import { auth } from '@/auth';
import { EventData } from './declaration';
import { notFound, redirect } from 'next/navigation';

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

    const data: { events: EventData[]; pagination: { total_pages: number } } =
      await res.json();

    if (!res.ok) return { error: 'Something went wrong. Please try again' };

    if (query) {
      return { events: data.events };
    }

    return { events: data.events, totalPages: data.pagination.total_pages };
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

export async function getRegisteredEvents() {
  const session = await auth();

  if (!session) {
    console.log('no session');
    redirect('/login');
  }

  try {
    const res = await fetch(
      `${process.env.SERVER_ENDPOINT}/events/registered`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );

    const data = await res.json();

    if (res.status == 404) return [];

    if (!res.ok) throw new Error('Something went wrong. Please try again');

    return data.events;
  } catch (error) {
    console.log(error);
    throw new Error('Server error. Please try again later.');
  }
}

export async function checkIsRegistered({ eventId }: { eventId: string }) {
  const session = await auth();

  if (!session) {
    return false;
  }

  const registeredEvents: EventData[] = await getRegisteredEvents();
  const isRegistered = registeredEvents.some((event) => event.id == eventId);

  return isRegistered;
}
