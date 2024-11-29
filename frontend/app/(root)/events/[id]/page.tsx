import EventDropdown from '@/components/event-dropdown';
import { Button } from '@/components/ui/button';
import { getEventById } from '@/lib/event-data';

import { EventData } from '@/lib/declaration';
import { formatDateTime, normalizeUrl } from '@/lib/utils';
import {
  ArrowRightIcon,
  CalendarDateRangeIcon,
  ClockIcon,
  LinkIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import previewImage from '@/public/images/default-fallback-image.png';
import EventsList from '@/components/events-list';
import EventActionButton from '@/components/event-action-button';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event: EventData = await getEventById(id);

  const organiser = event.user_info;

  const imageSrc = event.image_url || previewImage;

  if (!event) notFound();
  return (
    <div className='min-h-dvh overflow-x-clip max-w-5xl mx-auto'>
      <div>
        <div className='md:container md:pt-4'>
          <div className='relative min-h-[250px] md:min-h-[320px] lg:min-h-[350px]'>
            <Image
              src={imageSrc}
              fill
              priority
              alt='Event image'
              className='object-cover object-center w-full md:rounded-2xl'
            />
          </div>
        </div>

        <div className='container py-8 space-y-14'>
          <div className='flex flex-col md:flex-row md:justify-between gap-7'>
            <div className='space-y-5'>
              <h3 className='font-semibold text-[22px] md:pr-8'>
                {event.event_name}
              </h3>
              <h6 className='italic text-sm md:text-[16.5px] text-gray-500'>
                By {organiser.first_name} {organiser.last_name}
              </h6>

              <div className='space-y-3 font-medium text-sm text-gray-600'>
                <p className='flex items-center gap-2'>
                  <ClockIcon className='size-5 text-secondary/80' />
                  <span className=''>Starts:</span>{' '}
                  <span>
                    {formatDateTime(new Date(event.start_time)).dateTime}
                  </span>
                </p>
                <p className='flex items-center gap-2'>
                  <CalendarDateRangeIcon className='size-5 text-secondary/80' />
                  <span className=''>Ends:</span>{' '}
                  <span>
                    {formatDateTime(new Date(event.end_time)).dateTime}
                  </span>
                </p>
                <p className=' whitespace-nowrap flex items-center gap-2'>
                  <MapPinIcon className='size-5 text-secondary/80' />
                  {event.location}
                </p>
                {event.url && (
                  <p className=' whitespace-nowrap flex items-center gap-2'>
                    <LinkIcon className='size-5 text-secondary/80' />
                    <Link
                      href={normalizeUrl(event.url)}
                      rel='noopener noreferrer'
                      target='_blank'
                      className='underline'
                    >
                      {event.url}
                    </Link>
                  </p>
                )}
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='flex-1'>
                <Suspense
                  fallback={
                    <Skeleton className='rounded-full md:w-[150px] h-10' />
                  }
                >
                  <EventActionButton
                    eventId={id}
                    organiserId={organiser.user_id}
                  />
                </Suspense>
              </div>
              <EventDropdown eventId={id} eventOrganiser={organiser} />
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className='font-semibold text-lg'>About this event</h3>
            <p className='text-gray-500 text-[15px]'>{event.description}</p>
          </div>

          <div id='carousel-container' className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <h3 className='font-semibold text-xl sm:text-2xl'>
                You may also like
              </h3>
              <Link href='/events'>
                <Button variant='link' className='underline'>
                  View more <ArrowRightIcon />
                </Button>
              </Link>
            </div>
            <EventsList numEvents={10} type='slider' />
          </div>
        </div>
      </div>
    </div>
  );
}
