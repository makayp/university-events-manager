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
        {!paginate ? (
          <div className='mt-14 md:flex items-center justify-center hidden '>
            <Link href='/events'>
              <Button variant='link' className='text-[15px] underline '>
                View more <ArrowRightIcon />
              </Button>
            </Link>
          </div>
        ) : (
          <div>Add Pagination</div>
        )}
      </div>
    </div>
  );
}
