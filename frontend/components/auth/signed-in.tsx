'use client';

import { useSession } from 'next-auth/react';

export default function SignedIn({ children }: { children: React.ReactNode }) {
  const session = useSession();

  if (session.status !== 'authenticated') return null;

  return children;
}
