import { auth } from '@/auth';
import { Button } from '../ui/button';
import { checkIsRegistered } from '@/lib/event-data';
import RegisterationButton from './registration-button';
import { ParticipantsDialog } from './participants-dialog';

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
        <ParticipantsDialog eventId={eventId}>
          <Button
            size='lg'
            variant='outline'
            className='rounded-full w-full md:w-[170px] '
          >
            View participants
          </Button>
        </ParticipantsDialog>
      )}
      {!isEventOrganiser && (
        <RegisterationButton eventId={eventId} isRegistered={isRegistered} />
      )}
    </div>
  );
}
