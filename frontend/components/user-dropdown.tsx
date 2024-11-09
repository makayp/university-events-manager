import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from './auth/logout-button';
import { ClockIcon, TicketIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import UserAvatar from './user-avatar';

export const profileLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: UserIcon },
  { name: 'My events', href: '/dashboard/my-events', icon: TicketIcon },
  {
    name: 'RSVP Events',
    href: '/dashboard/rsvps',
    icon: ClockIcon,
  },

  { name: 'Account', href: '/dashboard/account', icon: UserIcon },
];

export default function UserDropdown({ imageSrc }: { imageSrc: string }) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='block focus:outline-none'>
          <UserAvatar imageSrc={imageSrc} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-40'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {profileLinks.map((link) => {
            return (
              <Link
                href={link.href}
                key={link.name}
                className='flex gap-2 hover:bg-gray-900/5 rounded-sm'
              >
                <DropdownMenuItem className='cursor-pointer'>
                  <link.icon className='size-4' /> {link.name}
                </DropdownMenuItem>
              </Link>
            );
          })}

          <DropdownMenuItem className='cursor-pointer hover:bg-gray-900/5'>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
