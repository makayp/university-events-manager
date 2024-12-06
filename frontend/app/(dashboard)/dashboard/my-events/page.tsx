import Filter from '@/components/shared/filter';
import MyEventsTable from '@/components/dashboard/my-events-table';
import { TableSkeleton } from '@/components/shared/skeleton';
import { Button } from '@/components/ui/button';
import { EventStatusProps } from '@/lib/declaration';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    eventStatus: EventStatusProps;
  }>;
}) {
  const eventStatus = (await searchParams).eventStatus || 'all';
  const page = Number((await searchParams).page) || 1;

  return (
    <section className='relative min-h-full'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between grow'>
          <h1 className='text-xl'>My Events</h1>

          <div className='flex items-center gap-4'>
            <Suspense>
              <div className='hidden md:block'>
                <Filter
                  filterField='eventStatus'
                  options={[
                    { label: 'All', value: 'all' },
                    { label: 'Upcoming', value: 'upcoming' },
                    { label: 'Ongoing', value: 'ongoing' },
                    { label: 'Past', value: 'past' },
                  ]}
                />
              </div>
              <div className='md:hidden'>
                <Filter
                  filterField='eventStatus'
                  options={[
                    { label: 'All', value: 'all' },
                    { label: 'Active', value: 'active' },
                    { label: 'Past', value: 'past' },
                  ]}
                />
              </div>
            </Suspense>

            <Link href='/events/create'>
              <Button className='hidden lg:inline-block bg-blue-600 hover:bg-blue-600/90'>
                Create Event
              </Button>
              <Button
                size='sm'
                className='bg-blue-600 hover:bg-blue-600/90 lg:hidden'
              >
                <Plus />
              </Button>
            </Link>
          </div>
        </div>

        <div className='overflow-x-scroll'>
          <Suspense key={page + eventStatus} fallback={<TableSkeleton />}>
            <MyEventsTable eventStatus={eventStatus} currentPage={page} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
