import { getEvents } from '@/lib/event-data';
import EventsCollection from './events-collection';
import { EventSlider } from './event-carousel';
import { Event } from '@/lib/declaration';

export default async function EventsList({
  type,
  numEvents,
  paginate = false,
  page,
  query,
  field,
}: {
  type: 'collection' | 'slider';
  numEvents: number;
  paginate?: boolean;
  page?: number;
  query?: string;
  field?: string;
}) {
  const data: { events?: Event[]; totalPages?: number } & {
    error?: string;
  } = await getEvents({
    limit: numEvents,
    query,
    page,
    field,
  });

  const events = data.events;
  const totalPages = data.totalPages;

  if (data.error || !events)
    return (
      <div className='flex items-center justify-center h-36'>
        <p>{data.error}</p>
      </div>
    );

  if (events.length < 1)
    return (
      <div className='flex items-center justify-center h-36'>
        <p>No event to show.</p>
      </div>
    );

  return (
    <div>
      {type === 'collection' && (
        <EventsCollection
          events={events}
          paginate={paginate}
          totalPages={totalPages}
        />
      )}
      {type === 'slider' && <EventSlider events={events} />}
    </div>
  );
}
