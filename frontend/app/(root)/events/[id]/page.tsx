import ConfirmDialog from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EventData } from '@/lib/declaration';
import { normalizeUrl } from '@/lib/utils';
import {
  CalendarDateRangeIcon,
  ChevronDownIcon,
  ClockIcon,
  LinkIcon,
  MapPinIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';

import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/api/events/${id}`);
  const data: EventData = await res.json();

  const userData = await fetch(
    `http://localhost:8000/api/users/${data.organiser}`
  );

  const user = await userData.json();

  if (!res.ok) notFound();
  return (
    <div className='min-h-dvh'>
      <div>
        <div className='md:container md:pt-4'>
          <div className='relative min-h-[250px] md:min-h-[320px] lg:min-h-[350px]'>
            <Image
              src={data.image}
              fill
              priority
              alt='Event image'
              className='object-cover object-center w-full md:rounded-2xl'
            />
          </div>
        </div>

        <div className='container py-8 space-y-14'>
          <div className='flex flex-col md:flex-row md:justify-between gap-7'>
            <div className='space-y-4'>
              <h3 className='font-semibold text-[22px] md:pr-8'>
                {data.title}
              </h3>
              <h6 className='italic text-[15px] md:text-[17px] text-gray-500'>
                By {user.first_name} {user.last_name}
              </h6>

              <div className='space-y-3 font-medium text-sm md:text-base text-gray-600'>
                <p className='flex items-center gap-2'>
                  <ClockIcon className='size-5 text-secondary/80' />
                  <span className=''>Starts: </span>{' '}
                  <span>{new Date(data.start_date).toUTCString()}</span>
                </p>
                <p className='flex items-center gap-2'>
                  <CalendarDateRangeIcon className='size-5 text-secondary/80' />
                  <span className=''>Ends: </span>{' '}
                  <span>{new Date(data.end_date).toUTCString()}</span>
                </p>
                <p className=' whitespace-nowrap flex items-center gap-2'>
                  <MapPinIcon className='size-5 text-secondary/80' />
                  {data.location}
                </p>
                {data.url && (
                  <p className=' whitespace-nowrap flex items-center gap-2'>
                    <LinkIcon className='size-5 text-secondary/80' />
                    <Link
                      href={normalizeUrl(data.url)}
                      rel='noopener noreferrer'
                      target='_blank'
                      className='underline'
                    >
                      {data.url}
                    </Link>
                  </p>
                )}
              </div>
            </div>
            <div className='flex gap-2'>
              <Button size='lg' className='rounded-full md:w-[150px] flex-1'>
                Register
              </Button>{' '}
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className='block focus:outline-none'
                >
                  <Button
                    size='lg'
                    variant='outline'
                    className='rounded-full px-7'
                  >
                    <ChevronDownIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-34 '>
                  <Link href={`/events/${id}/edit`}>
                    <DropdownMenuItem className='text-gray-900/80'>
                      <PencilSquareIcon /> Edit
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />
                  <ConfirmDialog>
                    <DropdownMenuItem className='text-destructive'>
                      <TrashIcon /> Delete
                    </DropdownMenuItem>
                  </ConfirmDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className='font-semibold text-lg'>About this event</h3>
            <p className='text-gray-500 text-[15px]'>{data.description}</p>
          </div>

          <div className='font-semibold text-lg'>
            <h3 className=''>You may also like</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
