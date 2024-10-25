'use client';

import { SessionProvider as Session } from 'next-auth/react';

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Session>{children}</Session>;
}
