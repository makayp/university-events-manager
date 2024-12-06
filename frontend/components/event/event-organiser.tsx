import { auth } from '@/auth';
import { Event } from '@/lib/declaration';

export default async function EventOrganiser({ event }: { event: Event }) {
  const session = await auth();

  const currentUser = session?.user;

  const isEventOrganiser = currentUser?.user_id == event.user_info.user_id;

  if (isEventOrganiser) return 'You';

  return (
    <>
      {event.user_info.first_name} {event.user_info.last_name}
    </>
  );
}
