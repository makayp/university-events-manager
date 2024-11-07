import { getEventOrganiser } from '@/lib/action';
import { EventData } from '@/lib/declaration';
import { formatDateTime, truncateText } from '@/lib/utils';
import { MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function Card({ event }: { event: EventData }) {
  const organiser = await getEventOrganiser(event.organiser);
  return (
    <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[400px]'>
      <Link
        href={`/events/${event.id}`}
        style={{ backgroundImage: `url(${event.image})` }}
        className='flex-1 flex items-center bg-cover bg-center'
      />

      <div
        className='flex min-h-[180px] flex-col gap-3 p-2 md:gap-4
      '
      >
        <Link href={`/events/${event.id}`} className='flex-1 flex flex-col'>
          <div className='flex flex-col gap-1 p-3 flex-1'>
            <p className='text-sm text-gray-500'>
              {formatDateTime(new Date(event.start_date)).dateTime}
            </p>
            <h1 className='font-medium'>{truncateText(event.title, 40)}</h1>
            <div className='flex-1' />

            <p className='flex items-center gap-1 text-gray-600'>
              <MapPinIcon className='size-[18px]' />
              <span className='text-sm'>{event.location}</span>
            </p>
            <p className='flex items-center gap-1 text-sm opacity-70'>
              <UserIcon className='size-[18px]' /> {organiser.first_name}{' '}
              {organiser.last_name}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
