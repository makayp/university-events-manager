'use client';

import { useAuth } from '@/context/auth-context';
// import { Skeleton } from '../ui/skeleton';

export default function SignedOut({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  if (isLoggedIn) return null;

  return children;
}
