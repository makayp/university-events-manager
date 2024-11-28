'use client';

import { registerForEvent, unregisterEvent } from '@/lib/action';
import { Button } from './ui/button';
import clsx from 'clsx';
import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import Spinner from './spinner';
import { useRouter } from 'next/navigation';

export default function RegisterationButton({
  eventId,
  isRegistered,
}: {
  eventId: string;
  isRegistered: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  async function handleRegistration() {
    startTransition(async () => {
      let response;

      if (isRegistered) {
        response = await unregisterEvent({ eventId });
      }

      if (!isRegistered) {
        response = await registerForEvent({ eventId });
      }

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

  console.log(isRegistered);

  return (
    <Button
      size='lg'
      variant={isRegistered ? 'outline' : 'default'}
      disabled={isPending}
      className={clsx('rounded-full w-full md:w-[150px]', {
        'ring-1 ring-primary': isRegistered,
      })}
      onClick={handleRegistration}
    >
      {isPending ? (
        <Spinner size='small' color={isRegistered ? 'primary' : 'light'} />
      ) : isRegistered ? (
        'Unregister'
      ) : (
        'Register'
      )}
    </Button>
  );
}
