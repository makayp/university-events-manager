'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from './logout-button';
import { useSession } from 'next-auth/react';
import {
  AdjustmentsHorizontalIcon,
  ClockIcon,
  TicketIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const profileLinks = [
  { name: 'Profile', href: '/account', icon: UserIcon },
  { name: 'My events', href: '/account/events', icon: TicketIcon },
  {
    name: 'My Upcoming',
    href: '/account/upcoming',
    icon: ClockIcon,
  },
  {
    name: 'Edit profile',
    href: '/account/edit',
    icon: AdjustmentsHorizontalIcon,
  },
];

export default function UserDropdown() {
  const session = useSession();

  if (session.status !== 'authenticated') return null;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className='block focus:outline-none'>
          <Avatar className='size-9 ring-1 ring-offset-1 ring-gray-900/10'>
            <AvatarImage src={session.data?.user?.image || ''} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {profileLinks.map((link) => {
            return (
              <Link
                href={link.href}
                key={link.name}
                className='flex gap-2 hover:bg-gray-900/10 rounded-sm'
              >
                <DropdownMenuItem className='cursor-pointer'>
                  <link.icon className='size-4' /> {link.name}
                </DropdownMenuItem>
              </Link>
            );
          })}

          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
