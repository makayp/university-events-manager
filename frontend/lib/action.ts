'use server';

import { z } from 'zod';
import { EventFormSchema, SignInSchema, SignUpSchema } from './zod';

import { auth, signIn, signOut } from '@/auth';
import { notFound, redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { EventData } from './declaration';
import { uploadImage } from './cloudinary';

export async function signup(userData: z.infer<typeof SignUpSchema>) {
  let isAccountCreated = false;
  let credentials = null;
  let data;
  try {
    const res = await fetch(`${process.env.SERVER_ENDPOINT}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        ...userData,
        firstName: userData.first_name,
        lastName: userData.last_name,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    data = await res.json();

    if (res.status == 409) {
      console.log(data);
      return { error: 'Email already exists' };
    }

    if (!res.ok) throw new Error('Something went wrong');

    if (res.ok) {
      credentials = userData;
      isAccountCreated = true;
    }
  } catch (error) {
    console.log(error);
    return { error: 'Something went wrong. Try again' };
  }

  if (isAccountCreated && credentials) await login(credentials, '/dashboard');
}

export async function login(
  values: z.infer<typeof SignInSchema>,
  redirectUrl?: string
) {
  let data;
  try {
    data = await signIn('credentials', { ...values, redirect: false });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
  }

  if (redirectUrl) redirect(redirectUrl);

  const url = new URL(data);
  const callback = url.searchParams.get('callbackUrl');

  redirect(callback || '/');
}

export async function logout() {
  await signOut();
}

export async function getEvents(limit: number) {
  let data;

  try {
    const res = await fetch(
      `${process.env.SERVER_ENDPOINT}/events/upcoming?per_page=${limit}`
    );

    data = await res.json();

    if (!res.ok) return { error: 'Something went wrong. Please try again' };

    return data.events;
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

export async function getUser(token?: string) {
  let session;

  if (!token) {
    session = await auth();
    token = session?.user.accessToken;
  }

  try {
    const res = await fetch(`${process.env.SERVER_ENDPOINT}/auth/get_user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await res.json();

    if (res.ok) {
      return user.user_info;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
}

export async function createEvent(newEvent: z.infer<typeof EventFormSchema>) {
  const session = await auth();

  if (!session) {
    console.log('no session');
    redirect('/login?callbackUrl=/events/create');
  }

  const event = {
    ...newEvent,
    start_time: newEvent.start_time.toISOString(),
    end_time: newEvent.end_time.toISOString(),
  };

  let imageUrl;
  if (event.image) {
    try {
      imageUrl = await uploadImage({
        image: event.image,
        folder: 'event-image',
      });
    } catch (error) {
      return {
        error: 'Something went wrong. Please try again later.',
      };
    }

    event.image_url = imageUrl;
  }

  let data;

  try {
    const res = await fetch(`${process.env.SERVER_ENDPOINT}/events/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify(event),
    });

    if (!res.ok) {
      return { error: `Server error: ${res.status}` };
    }

    data = await res.json();
  } catch (error) {
    console.error('Network error:', error);
    return {
      error: 'Server error. Please try again later.',
    };
  }

  return { success: 'Event created successfully', newEventId: data.event };
}

export async function updateEvent(
  updatedEvent: z.infer<typeof EventFormSchema>,
  eventId: string
) {
  const session = await auth();

  if (!session) {
    console.log('no session');
    redirect(`/login?callbackUrl=/events/${eventId}/edit`);
  }

  const event = {
    ...updatedEvent,
    start_time: updatedEvent.start_time.toISOString(),
    end_time: updatedEvent.end_time.toISOString(),
  };

  let imageUrl;
  if (event.image) {
    try {
      imageUrl = await uploadImage({
        image: event.image,
        folder: 'event-image',
      });
    } catch (error) {
      return {
        error: 'Something went wrong. Please try again later.',
      };
    }
  }

  event.image_url = imageUrl || event.image_url;

  try {
    const res = await fetch(
      `${process.env.SERVER_ENDPOINT}/events/${eventId}/update`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: JSON.stringify(event),
      }
    );

    if (!res.ok) {
      return { error: `Server error: ${res.status}` };
    }

    await res.json();
    return { success: 'Event updated successfully' };
  } catch (error) {
    console.error('Network error:', error);
    return {
      error: 'Server error. Please try again later.',
    };
  }
}

export async function deleteEvent(eventId: string) {
  const session = await auth();

  if (!session) {
    console.log('no session');
    redirect(`/login?callbackUrl=/events/${eventId}`);
  }

  try {
    const res = await fetch(
      `${process.env.SERVER_ENDPOINT}/events/${eventId}/delete`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );

    if (!res.ok) {
      return { error: 'Something went wrong. Try again' };
    }

    return { success: 'Event deleted successfully' };
  } catch (error) {
    console.log(error);
    return { error: 'Server error. Try again' };
  }
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
    console.log('no session');
    redirect(`/login?callbackUrl=/events/${eventId}`);
  }

  const registeredEvents: EventData[] = await getRegisteredEvents();
  const isRegistered = registeredEvents.some((event) => event.id == eventId);

  return isRegistered;
}

export async function registerForEvent({ eventId }: { eventId: string }) {
  const session = await auth();

  if (!session) {
    console.log('no session');
    redirect(`/login?callbackUrl=/events/${eventId}`);
  }

  try {
    const res = await fetch(
      `${process.env.SERVER_ENDPOINT}/events/${eventId}/register`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );

    const data = await res.json();

    console.log(res.status, data);

    if (res.status == 409) {
      return { error: 'You already registered for this event' };
    }

    if (!res.ok) return { error: 'Something went wrong. Please try again' };

    return { success: 'You successfully registered for the event' };
  } catch (error) {
    console.log(error);
    return {
      error: 'Server error. Please try again later.',
    };
  }
}

export async function unregisterEvent({ eventId }: { eventId: string }) {
  const session = await auth();

  if (!session) {
    console.log('no session');
    redirect(`/login?callbackUrl=/events/${eventId}`);
  }

  try {
    const res = await fetch(
      `${process.env.SERVER_ENDPOINT}/events/${eventId}/unregister`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );

    const data = await res.json();

    console.log(res.status, data);

    if (res.status == 404) {
      return { error: 'You are not registered for this event' };
    }

    if (!res.ok) return { error: 'Something went wrong. Please try again' };

    return { success: 'You successfully unregistered from the event' };
  } catch (error) {
    console.log(error);
    return {
      error: 'Server error. Please try again later.',
    };
  }
}
