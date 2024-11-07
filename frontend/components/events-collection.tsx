import { EventData } from '@/lib/declaration';
import Card from './card';
import clsx from 'clsx';

export default function EventsCollection({
  events,
  paginate = false,
  className,
}: {
  events: EventData[];
  paginate?: boolean;
  className: string;
}) {
  return (
    <div className={className}>
      <div className='py-5'>
        <div className='flex flex-col items-center justify-center px-2 sm:p-0'>
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
            {events.map((event) => {
              return (
                <li key={event.id} className='flex items-center justify-center'>
                  <Card event={event} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className={clsx({ hidden: !paginate })}>Add Pagination</div>
      </div>
    </div>
  );
}
