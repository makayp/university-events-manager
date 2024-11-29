import { ChevronsUpDown } from 'lucide-react';

import { auth } from '@/auth';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DropdownContent from './sidebar-user-content';
import UserAvatar from './user-avatar';
import { getUser } from '@/lib/user-data';

export default async function SidebarUser() {
  const user = await getUser();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='w-full cursor-pointer text-gray-800'
      >
        <div className='flex items-center justify-center gap-2'>
          <UserAvatar imageSrc={user.image_url || ''} />

          <div className='hidden md:grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>{user.first_name}</span>
            <span className='truncate text-xs'>{user.email}</span>
          </div>
          <ChevronsUpDown className='md:ml-auto size-4 absolute right-3.5 text-gray-400 md:static' />
        </div>
      </DropdownMenuTrigger>
      <DropdownContent user={user} />
    </DropdownMenu>
  );
}
