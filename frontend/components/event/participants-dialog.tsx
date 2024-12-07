'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import UserAvatar from '../shared/user-avatar';
import { Users } from 'lucide-react';
import clsx from 'clsx';
import { DBUser } from '@/lib/declaration';
import { useCallback, useEffect, useState } from 'react';
import Spinner from '../shared/spinner';
import { getParticipants } from '@/lib/action';
import { Skeleton } from '../ui/skeleton';

export function ParticipantsDialog({
  isOpen,
  setIsOpen,
  eventId,
  isOnDashboard = false,
  children,
}: {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  eventId: string;
  isOnDashboard?: boolean;
  children?: React.ReactNode;
}) {
  const [participants, setParticipants] = useState<DBUser[]>([]);

  const [isPending, setIsPending] = useState<boolean>(false);

  const sortedUsers = participants
    .slice()
    .sort((a, b) => a.first_name.localeCompare(b.first_name));

  const onLoad = useCallback(
    async function onLoad() {
      setIsPending(true);
      const participants = await getParticipants(eventId);
      setParticipants(participants);
      setIsPending(false);
    },
    [eventId]
  );

  useEffect(() => {
    if (isOpen) onLoad();
  }, [isOpen, onLoad]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen?.(isOpen);
        if (isOpen) onLoad();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px] max-h-[80%] flex flex-col'>
        <DialogHeader>
          <DialogTitle className='tracking-normal'>Participants</DialogTitle>
          <DialogDescription>
            Below is a list of everyone registered for this event.
          </DialogDescription>
        </DialogHeader>

        {isPending && (
          <div className='flex items-center justify-center py-5'>
            <Spinner size='large' color='dark' />
          </div>
        )}

        {!isPending && sortedUsers.length < 1 && (
          <div className='flex items-center justify-center py-5'>
            <p className='text-gray-700'>No participants</p>
          </div>
        )}

        {!isPending && sortedUsers.length > 0 && (
          <div className='overflow-y-scroll space-y-5 py-5 px-2'>
            {sortedUsers.map((user) => (
              <div key={user.email} className='flex items-center gap-4'>
                <UserAvatar imageSrc={user.image_url} className='size-8' />
                <div>
                  <p className='line-clamp-1'>
                    {user.first_name} {user.last_name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <DialogFooter className='flex flex-row !items-center !justify-between'>
          {isPending ? (
            <Skeleton className='w-10 h-5' />
          ) : (
            <span className='flex items-center gap-2'>
              <Users className='size-5' /> {sortedUsers.length}
            </span>
          )}
          <DialogClose
            className={clsx('text-white  px-8 py-2', {
              'bg-primary hover:bg-primary/90 rounded-full': !isOnDashboard,
              'bg-blue-600 hover:bg-blue-600/90 rounded-lg': isOnDashboard,
            })}
          >
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
