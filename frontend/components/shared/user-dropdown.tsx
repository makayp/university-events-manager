import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from '../auth/logout-button';

import Link from 'next/link';
import UserAvatar from '../shared/user-avatar';
import { DASHBOARD_LINKS } from '@/lib/constants';

export default function UserDropdown({
  imageSrc,
}: {
  imageSrc: string | null | undefined;
}) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='block focus:outline-none'>
          <UserAvatar imageSrc={imageSrc} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-40'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {DASHBOARD_LINKS.map((link) => {
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
