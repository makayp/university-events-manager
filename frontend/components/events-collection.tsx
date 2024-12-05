import { Event } from '@/lib/declaration';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import Card from './card';
import { Button } from './ui/button';
import Pagination from './pagination';

export default function EventsCollection({
  events,
  paginate = false,
  totalPages,
  className,
}: {
  events: Event[];
  paginate?: boolean;
  totalPages: number | undefined;
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
        ) : !totalPages ? null : (
          <div className='mt-5 py-20 flex items-center justify-center'>
            {<Pagination totalPages={totalPages} />}
          </div>
        )}
      </div>
    </div>
  );
}
