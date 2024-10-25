'use client';

import { SessionUser } from '@/lib/declaration';
import { useSession } from 'next-auth/react';

export default function Page() {
  const session = useSession();

  const user = session.data?.user as SessionUser;

  return <div>{user?.first_name}&apos;s Account</div>;
}
