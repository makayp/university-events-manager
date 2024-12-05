'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useToast } from '@/hooks/use-toast';
import { deleteEvent, unregisterEvent } from '@/lib/action';
import { EventOrganiser } from '@/lib/declaration';
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { Eye, Undo2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { twMerge } from 'tailwind-merge';
import ConfirmDialog from './confirm-dialog';
import Share from './share-dialog';
import Spinner from './spinner';
import { Button } from './ui/button';

export default function EventDropdown({
  eventId,
  eventOrganiser,
  className,
}: {
  eventId: string;
  eventOrganiser: EventOrganiser;
  className?: string;
}) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isShareDialogOpen, setShareDialogOpen] = useState(false);
  const [isUnregisterDialogOpen, setIsUnregisterDialogOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();

  const isOnDashboard = pathname.startsWith('/dashboard');

  const { toast } = useToast();

  const { data } = useSession();

  const isEventOrganiser = data?.user.user_id == eventOrganiser.user_id;

  async function handleDeleteEvent() {
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
        setIsDeleteDialogOpen(false);

        // const redirectTo =
        //   pathname === `/events/${eventId}`
        //     ? '/events'
        //     : '/dashboard/my-events';

        const redirectTo = '/dashboard/my-events';

        router.push(redirectTo);
      }
    });
  }

  async function handleUnregisterEvent() {
    startTransition(async () => {
      const response = await unregisterEvent({ eventId });

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: response.error,
        });
      }

      if (response?.success) {
        toast({
          title: 'Success',
          description: response.success,
        });
      }

      router.refresh();
    });
  }

  return (
    <>
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        warning="This will permanently delete your
            event's data."
      >
        <Button
          disabled={isPending}
          className={clsx('min-w-24', {
            'bg-blue-600 hover:bg-blue-600/90': isOnDashboard,
          })}
          onClick={handleDeleteEvent}
        >
          {isPending ? <Spinner size='small' /> : 'Delete'}
        </Button>
      </ConfirmDialog>

      <ConfirmDialog
        isOpen={isUnregisterDialogOpen}
        setIsOpen={setIsUnregisterDialogOpen}
        warning='You will be unregistered from this event.'
      >
        <Button
          disabled={isPending}
          className={clsx('min-w-24', {
            'bg-blue-600 hover:bg-blue-600/90': isOnDashboard,
          })}
          onClick={handleUnregisterEvent}
        >
          {isPending ? <Spinner size='small' /> : 'Unregister'}
        </Button>
      </ConfirmDialog>

      <Share
        isOnDashboard={isOnDashboard}
        url={`${process.env.NEXT_PUBLIC_URL}/events/${eventId}`}
        isOpen={isShareDialogOpen}
        setIsOpen={setShareDialogOpen}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild className='block focus:outline-none'>
          <Button
            size='lg'
            variant='outline'
            className={twMerge(
              'px-7 rounded-full [&_svg]:stroke-gray-400',
              className
            )}
          >
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
                  setIsDeleteDialogOpen(true);
                }}
              >
                <TrashIcon /> Delete
              </DropdownMenuItem>
            </>
          )}

          {isOnDashboard && (
            <>
              <DropdownMenuSeparator />
              <Link href={`/events/${eventId}`}>
                <DropdownMenuItem className='text-gray-900/80 hover:bg-gray-100'>
                  <Eye /> Details
                </DropdownMenuItem>
              </Link>
            </>
          )}

          {!isEventOrganiser && isOnDashboard && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='text-destructive hover:bg-gray-100'
                onClick={() => {
                  setIsUnregisterDialogOpen(true);
                }}
              >
                <Undo2 /> Unregister
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
