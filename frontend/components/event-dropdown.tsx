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
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import ConfirmDialog from './confirm-dialog';
import Share from './share-dialog';
import { Button } from './ui/button';

export default function EventDropdown({
  eventId,
  eventOrganiser,
}: {
  eventId: string;
  eventOrganiser: string;
}) {
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);
  const [isShareDialogOpen, setShareDialogOpen] = useState(false);

  const { data } = useSession();

  const isEventOrganiser = data?.user.id == eventOrganiser;

  return (
    <>
      <ConfirmDialog
        action='Delete'
        isOpen={isAlertDialogOpen}
        setIsOpen={setAlertDialogOpen}
      />
      <Share isOpen={isShareDialogOpen} setIsOpen={setShareDialogOpen} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild className='block focus:outline-none'>
          <Button size='lg' variant='outline' className='rounded-full px-7'>
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end' className='w-36'>
          <DropdownMenuItem
            className='text-gray-900/80 hover:bg-gray-100'
            onClick={() => setShareDialogOpen(true)}
          >
            <ShareIcon /> Share
          </DropdownMenuItem>

          {isEventOrganiser && (
            <>
              {' '}
              <DropdownMenuSeparator />
              <Link href={`/events/${eventId}/edit`}>
                <DropdownMenuItem className='text-gray-900/80 hover:bg-gray-100'>
                  <PencilSquareIcon /> Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='text-destructive hover:bg-gray-100'
                onClick={() => {
                  setAlertDialogOpen(true);
                }}
              >
                <TrashIcon /> Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
