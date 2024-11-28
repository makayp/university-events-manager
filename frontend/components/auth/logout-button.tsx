'use client';

import { logout } from '@/lib/action';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      className='flex items-center gap-2 text-destructive'
      onClick={async () => {
        signOut({ redirect: false });
        await logout();
      }}
    >
      <LogOut className='size-4' />
      Log out
    </button>
  );
}
