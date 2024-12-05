import Filter from '@/components/filter';
import RsvpTable from '@/components/rsvp-table';
import { TableSkeleton } from '@/components/skeleton';
// import RsvpTable from '@/components/table';
import { EventStatusProps } from '@/lib/declaration';
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
          <h1 className='text-xl'>RSVPs</h1>
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
        </div>

        <div className='overflow-x-scroll'>
          <Suspense key={page + eventStatus} fallback={<TableSkeleton />}>
            <RsvpTable eventStatus={eventStatus} currentPage={page} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}