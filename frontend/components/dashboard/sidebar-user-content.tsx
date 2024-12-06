'use client';

import useBreakpoint from '@/hooks/use-breakpoint';
import { DBUser } from '@/lib/declaration';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from '../auth/logout-button';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import UserAvatar from '../shared/user-avatar';

export default function DropdownContent({ user }: { user: DBUser }) {
  const { isMobile } = useBreakpoint();

  return (
    <DropdownMenuContent
      className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
      side={isMobile ? 'bottom' : 'right'}
      align='end'
      sideOffset={4}
    >
      <DropdownMenuLabel className='p-0 font-normal'>
        <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
          <UserAvatar imageSrc={user.image_url || ''} />
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>
              {user.first_name} {user.last_name}
            </span>
            <span className='truncate text-xs'>{user.email}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <Link href='/dashboard/account'>
          <DropdownMenuItem className='hover:bg-gray-900/5'>
            <Edit />
            Edit Profile
          </DropdownMenuItem>
        </Link>
        {/* <DropdownMenuSeparator />

        <DropdownMenuItem className='hover:bg-gray-900/5'>
          <Settings />
          Settings
        </DropdownMenuItem> */}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem className='hover:bg-gray-900/5'>
        <LogoutButton />
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
