import EventsList from '@/components/events-list';
import Search from '@/components/search';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; query: string; searchBy: string }>;
}) {
  const queryParams = await searchParams;

  const page = Number(queryParams.page) || 1;
  const field = queryParams.searchBy || 'event_name';
  const query = queryParams.query || '';

  console.log('Page: ' + page, 'Query: ' + query, 'Field: ' + field);
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

          <Search />
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
