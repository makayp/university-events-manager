'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useToast } from '@/hooks/use-toast';
import { deleteEvent } from '@/lib/action';
import { EventUserInfo } from '@/lib/declaration';
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import ConfirmDialog from './confirm-dialog';
import Share from './share-dialog';
import Spinner from './spinner';
import { Button } from './ui/button';

export default function EventDropdown({
  eventId,
  eventOrganiser,
}: {
  eventId: string;
  eventOrganiser: EventUserInfo;
}) {
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);
  const [isShareDialogOpen, setShareDialogOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();

  const { toast } = useToast();

  const { data } = useSession();

  const isEventOrganiser =
    String(data?.user.user_id) == String(eventOrganiser.user_id);

  async function handleClick() {
    startTransition(async () => {
      const response = await deleteEvent(eventId);

      if (response.error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: response.error,
        });
      }
      if (response.success) {
        toast({
          title: 'Success',
          description: response.success,
        });
        setAlertDialogOpen(false);

        const redirectTo =
          pathname === `/events/${eventId}`
            ? '/events'
            : '/dashboard/my-events';

        router.push(redirectTo);
      }
    });
  }

  return (
    <>
      <ConfirmDialog
        action='Delete'
        isOpen={isAlertDialogOpen}
        setIsOpen={setAlertDialogOpen}
      >
        <Button disabled={isPending} className='min-w-24' onClick={handleClick}>
          {isPending ? <Spinner size='small' /> : 'Delete'}
        </Button>
      </ConfirmDialog>
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
