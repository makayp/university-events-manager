import 'server-only';

import { auth } from '@/auth';

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
