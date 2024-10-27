'use client';

import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Page() {
  const [user, setUser] = useState('');

  useEffect(function () {
    async function getUser() {
      const session = await getSession();

      if (session) setUser(session.user.first_name);
    }

    getUser();

    console.log('Heey from useEffect');
  }, []);

  return <div>{user}&apos;s Account</div>;
}
