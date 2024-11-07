'use server';

import { z } from 'zod';
import { SignInSchema } from './zod';

import { signIn, signOut } from '@/auth';
import { notFound, redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

export async function login(values: z.infer<typeof SignInSchema>) {
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

  const url = new URL(data);
  const callback = url.searchParams.get('callbackUrl');

  redirect(callback || '/');
}

export async function logout() {
  await signOut();
}

export async function getEvents(limit: number) {
  let events;
  try {
    const res = await fetch('http:/localhost:8000/api/events');

    events = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch latest events');
  }

  return events.slice(0, limit);
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

export async function getEventOrganiser(id: string) {
  let data;
  try {
    const res = await fetch(`http://localhost:8000/api/users/${id}`);

    data = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch event data.');
  }

  return data;
}
