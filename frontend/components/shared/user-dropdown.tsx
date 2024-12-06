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
import { DBUser } from '@/lib/declaration';
import { getUser } from '@/lib/user-data';

export default async function UserDropdown() {
  const user: DBUser = await getUser();

  if (!user) return null;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='block focus:outline-none'>
          <UserAvatar imageSrc={user.image_url} />
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
