'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from './auth/logout-button';
import {
  AdjustmentsHorizontalIcon,
  ClockIcon,
  TicketIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import UserAvatar from './user-avatar';

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

export default function UserDropdown({ imageSrc }: { imageSrc: string }) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className='block focus:outline-none'>
          <UserAvatar imageSrc={imageSrc} />
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
