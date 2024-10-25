'use client';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';

export default function LogoutButton() {
  const router = useRouter();
  return (
    <Button
      variant='link'
      className='p-0 bg-none hover:bg-none focus-visible:bg-none focus:bg-none'
      onClick={() => {
        signOut({ redirect: false });
        router.push('/');
      }}
    >
      <ArrowRightEndOnRectangleIcon className='size-4' /> Logout
    </Button>
  );
}
