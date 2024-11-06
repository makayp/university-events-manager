'use client';

import { Button } from '../ui/button';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
import { logout } from '@/lib/action';

export default function LogoutButton() {
  return (
    <Button
      variant='link'
      className='p-0 bg-none  hover:no-underline'
      onClick={async () => {
        await logout();
      }}
    >
      <ArrowRightEndOnRectangleIcon className='size-4' /> Logout
    </Button>
  );
}
