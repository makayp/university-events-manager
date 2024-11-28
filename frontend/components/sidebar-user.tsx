'use client';

import { ChevronsUpDown, Edit, Settings } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useBreakpoint from '@/hooks/use-breakpoint';
import LogoutButton from './auth/logout-button';
import UserAvatar from './user-avatar';

export default function SidebarUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useBreakpoint();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='w-full cursor-pointer text-gray-800'
      >
        <div className='flex items-center justify-center gap-2'>
          <UserAvatar imageSrc={user.avatar} />

          <div className='hidden md:grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>{user.name}</span>
            <span className='truncate text-xs'>{user.email}</span>
          </div>
          <ChevronsUpDown className='md:ml-auto size-4 absolute right-3.5 text-gray-400 md:static' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
        side={isMobile ? 'bottom' : 'right'}
        align='end'
        sideOffset={4}
      >
        <DropdownMenuLabel className='p-0 font-normal'>
          <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
            <UserAvatar imageSrc={user.avatar} />
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>{user.name}</span>
              <span className='truncate text-xs'>{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className='hover:bg-gray-900/5'>
            <Edit />
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem className='hover:bg-gray-900/5'>
            <Settings />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='hover:bg-gray-900/5'>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
