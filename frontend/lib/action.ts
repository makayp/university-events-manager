'use server';

import { z } from 'zod';
import { SignInSchema } from './zod';

import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';
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
