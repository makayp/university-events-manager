import { getEvents } from '@/lib/action';
import EventsCollection from './events-collection';
import { EventSlider } from './event-carousel';
import { EventData } from '@/lib/declaration';

export default async function EventsList({
  type,
  numEvents,
  paginate = false,
}: {
  type: 'collection' | 'slider';
  numEvents: number;
  paginate?: boolean;
}) {
  const events: EventData[] & { error: string } = await getEvents(numEvents);

  if (events.error)
    return (
      <div className='flex items-center  -center justify-center h-36'>
        <p>{events.error}</p>
      </div>
    );

  if (events.length < 1)
    return (
      <div className='flex items-center  -center justify-center h-36'>
        <p>No events currently, check back later.</p>
      </div>
    );

  return (
    <div>
      {type === 'collection' && (
        <EventsCollection events={events} paginate={paginate} />
      )}
      {type === 'slider' && <EventSlider events={events} />}
    </div>
  );
}
