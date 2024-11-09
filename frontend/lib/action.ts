'use server';

import { z } from 'zod';
import { EventFormSchema, SignInSchema, SignUpSchema } from './zod';

import { auth, signIn, signOut } from '@/auth';
import { notFound, redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { EventData } from './declaration';

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

    console.log(data);

    if (res.ok) return data.events;
  } catch (error) {
    console.log(error);
    // return { error: { message: 'Something went wrong' } };
  }

  return [];
}

export async function getEventById(id: string) {
  console.log('id', id);
  let event;
  let res;
  try {
    res = await fetch(`http://localhost:8000/api/events/${id}`);

    event = await res.json();
    console.log(res.status);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch event data');
  }

  if (res.status == 404) notFound();

  return event;
}

export async function getUser(token?: string) {
  let session;

  if (!token) {
    session = await auth();
    token = session?.user.accessToken!;
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

export async function getEventOrganiser(organizerId: string) {}

export async function createEvent(event: z.infer<typeof EventFormSchema>) {
  const session = await auth();

  if (!session) redirect('/login');

  const res = await fetch(`${process.env.SERVER_ENDPOINT}/events/create}`);
}
