'use client';

import { useSession } from 'next-auth/react';
import { Skeleton } from '../ui/skeleton';

export default function SignedOut({ children }: { children: React.ReactNode }) {
  const session = useSession();

  if (session.status === 'loading')
    return <Skeleton className='w-14 h-4 rounded-xl' />;

  if (session.status !== 'unauthenticated') return null;

  return children;
}
