import { getEvents } from '@/lib/action';
import EventsCollection from './events-collection';
import { EventSlider } from './event-carousel';
import { EventData } from '@/lib/declaration';

export default async function EventsList({
  type,
  numEvents,
}: {
  type: 'collection' | 'slider';
  numEvents: number;
}) {
  const events: EventData[] = await getEvents(numEvents);
  console.log(events);

  return (
    <div>
      {type === 'collection' && <EventsCollection events={events} />}
      {type === 'slider' && <EventSlider events={events} />}
    </div>
  );
}
