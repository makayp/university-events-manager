import EventsCollection from '@/components/events-collection';
import { Input } from '@/components/ui/input';
import { getEvents } from '@/lib/action';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default async function Page() {
  const events = await getEvents(3);

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

          <div className='relative flex items-center w-full  max-w-3xl mx-auto'>
            <MagnifyingGlassIcon className='size-5 top-1/2 -translate-y-1/2 left-2 absolute opacity-60' />
            <Input
              placeholder='Search'
              className='rounded-full pl-8 h-10 lg:h-10 shadow-none'
            />
            <span className='border-l-[1.5px] border-gray-300 absolute right-4 top-2.5 bottom-2.5 pl-1 flex items-center'>
              <AdjustmentsHorizontalIcon className='size-[18px] text-gray-700' />
            </span>
          </div>
        </div>

        <div className='container'>
          <EventsCollection events={events} />
        </div>
      </div>
    </div>
  );
}
