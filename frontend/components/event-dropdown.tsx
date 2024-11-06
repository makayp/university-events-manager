'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import ConfirmDialog from './confirm-dialog';
import { Button } from './ui/button';
import { useState } from 'react';

export default function EventDropdown({ eventId }: { eventId: string }) {
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);

  return (
    <>
      <ConfirmDialog
        action='Delete'
        isOpen={isAlertDialogOpen}
        setIsOpen={setAlertDialogOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='block focus:outline-none'>
          <Button size='lg' variant='outline' className='rounded-full px-7'>
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-34 '>
          <Link href={`/events/${eventId}/edit`}>
            <DropdownMenuItem className='text-gray-900/80'>
              <PencilSquareIcon /> Edit
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className='text-destructive'
            onClick={() => {
              setAlertDialogOpen(true);
            }}
          >
            <TrashIcon /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
