import { EventData } from '@/lib/declaration';
import Card from './card';

export default function EventsCollection({ events }: { events: EventData[] }) {
  return (
    <div className='py-5'>
      <div className=''>
        <div className='flex flex-col items-center justify-center px-5 sm:p-0'>
          <ul className='grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
            {events.map((event) => {
              return (
                <li key={event.id} className='flex items-center justify-center'>
                  <Card event={event} />
                </li>
              );
            })}
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  );
}
