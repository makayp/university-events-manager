import EventsList from '@/components/event/events-list';
import Search from '@/components/shared/search';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Explore Events',
  description: "Let's find various events happening around campus.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; query: string; searchBy: string }>;
}) {
  const queryParams = await searchParams;

  const page = Number(queryParams.page) || 1;
  const field = queryParams.searchBy || 'event_name';
  const query = queryParams.query || '';

  return (
    <div className='py-2 md:py-7'>
      <div className='flex flex-col gap-4'>
        <div className='container flex flex-col gap-4 py-8'>
          <div className='flex md:gap-1 flex-col text-center'>
            <h1 className='text-2xl sm:text-3xl font-medium'>Explore Events</h1>
            <h3 className='text-sm md:text-base font-medium text-black/60'>
              Let&apos;s find various events happening around campus.
            </h3>
          </div>
          <Suspense>
            <Search center rounded className='max-w-3xl' />
          </Suspense>
        </div>

        <div className='container'>
          <EventsList
            type='collection'
            numEvents={12}
            paginate
            page={page}
            query={query}
            field={field}
          />
        </div>
      </div>
    </div>
  );
}
