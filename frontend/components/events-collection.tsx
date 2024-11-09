import { EventData } from '@/lib/declaration';
import Card from './card';
import clsx from 'clsx';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export default function EventsCollection({
  events,
  paginate = false,
  className,
}: {
  events: EventData[];
  paginate?: boolean;
  className?: string;
}) {
  if (events.length < 1)
    return (
      <div className='flex items-center  -center justify-center h-36'>
        <p>No events currently, check back later.</p>
      </div>
    );

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
        <div className='mt-10 md:flex items-center justify-center hidden '>
          <Link href='/events'>
            <Button size='lg' className='rounded-full px-10 h-12'>
              View more <ArrowRightIcon />
            </Button>
          </Link>
        </div>
        <div className={clsx({ hidden: !paginate })}>Add Pagination</div>
      </div>
    </div>
  );
}
