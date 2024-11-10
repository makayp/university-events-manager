import { auth } from '@/auth';
import { Button } from './ui/button';
import Link from 'next/link';
import RegisterationButton from './registeration-button';
import { checkIsRegistered } from '@/lib/action';

export default async function EventActionButton({
  eventId,
  organiserId,
}: {
  eventId: string;
  organiserId: string;
}) {
  const session = await auth();

  const isEventOrganiser = organiserId == session?.user.user_id;

  const isRegistered = await checkIsRegistered({ eventId });

  return (
    <div className=''>
      {isEventOrganiser && (
        <Link href={`/dashboard/my-events/${eventId}`}>
          <Button
            size='lg'
            variant='outline'
            className='rounded-full w-full md:w-[150px] '
          >
            Manage event
          </Button>
        </Link>
      )}
      {!isEventOrganiser && (
        <RegisterationButton eventId={eventId} isRegistered={isRegistered} />
      )}
    </div>
  );
}
