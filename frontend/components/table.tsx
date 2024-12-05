import { Event } from '@/lib/declaration';
import { formatDateToLocal, getEventStatus, truncateText } from '@/lib/utils';
import { TicketIcon } from '@heroicons/react/24/outline';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import EventDropdown from './event-dropdown';
import EventStatus from './event-status';
import Pagination from './pagination';
import EventOrganiser from './event-organiser';

export default async function Table({
  events,
  totalPages,
}: {
  events: Event[];
  totalPages: number;
}) {
  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
          <div className='md:hidden'>
            {events?.map((event) => (
              <div
                key={event.id}
                className='mb-4 w-full rounded-md bg-white p-4'
              >
                <div className='flex items-center justify-between border-b pb-4'>
                  <p>{formatDateToLocal(event.start_time)}</p>

                  <EventStatus status={getEventStatus(event)} />
                </div>

                <div className='py-4'>
                  <div className='mb-2 flex items-center gap-2'>
                    <div className='relative size-[40px] min-w-[40px]'>
                      <Image
                        src={event.image_url}
                        className='rounded-md object-cover object-center'
                        fill
                        alt={"Event's image"}
                      />
                    </div>
                    <Link
                      href={`/events/${event.id}`}
                      className='line-clamp-2 hover:text-gray-600'
                    >
                      {truncateText(event.event_name, 600)}
                    </Link>
                  </div>
                  <p className='text-sm text-gray-500 flex items-center gap-2'>
                    <User className='size-4' />
                    <span>
                      <EventOrganiser event={event} />
                    </span>
                  </p>
                </div>

                <div className='flex w-full items-center justify-between pt-4 border-t'>
                  <div className='flex items-center gap-1'>
                    <TicketIcon className='size-5' />
                    <p className='text-sm font-medium'>
                      RSVPs:
                      <span className='ml-2'>{event.total_registered}</span>
                    </p>
                  </div>
                  <div className='flex justify-end gap-2'>
                    <EventDropdown
                      eventId={event.id}
                      eventOrganiser={event.user_info}
                      className='rounded-none px-3 border-none shadow-none h-fit'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <table className='hidden min-w-full text-gray-900 md:table'>
            <thead className='rounded-lg text-left text-sm font-normal'>
              <tr>
                <th
                  scope='col'
                  className='px-4 py-5 font-medium sm:pl-6 min-w-[18rem] xl:w-[30rem]'
                >
                  Event
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Organiser
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  RSVPs
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Start date
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Status
                </th>
                <th scope='col' className='relative py-3 pl-6 pr-3'>
                  <span className='sr-only'>Edit</span>
                </th>
              </tr>
            </thead>

            <tbody className='bg-white'>
              {events?.map((event) => (
                <tr
                  key={event.id}
                  className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                >
                  <td className='py-3 pl-6'>
                    <div className='flex items-center gap-3 xl:gap-4'>
                      <div className='relative size-[40px] min-w-[40px]'>
                        <Image
                          src={event.image_url}
                          className='rounded-md object-cover object-center'
                          fill
                          alt={"Event's image"}
                        />
                      </div>

                      <Link
                        href={`/events/${event.id}`}
                        className='pr-5 line-clamp-2 hover:text-gray-600'
                      >
                        {truncateText(event.event_name, 70)}
                      </Link>
                    </div>
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    <EventOrganiser event={event} />
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    <span>{event.total_registered}</span>
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {formatDateToLocal(event.start_time)}
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    <EventStatus status={getEventStatus(event)} />
                  </td>
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    <div className='flex justify-end gap-3'>
                      <EventDropdown
                        eventId={event.id}
                        eventOrganiser={event.user_info}
                        className='rounded-xl px-3 border-none shadow-none'
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {events.length < 1 && (
            <div className='min-h-28 flex items-center justify-center bg-white'>
              <p>No events to show</p>
            </div>
          )}
        </div>
        {events.length > 0 && (
          <div className='flex items-start justify-center py-5 mt-5'>
            <Pagination totalPages={totalPages} />
          </div>
        )}
      </div>
    </div>
  );
}
