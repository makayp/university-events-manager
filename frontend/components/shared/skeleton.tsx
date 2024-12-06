import { TABLE_LIMIT } from '@/lib/constants';
import { Skeleton } from '../ui/skeleton';

export function SkeletonSidebarUser() {
  return (
    <div className='flex items-center space-x-2'>
      <Skeleton className='size-8 rounded-full' />
      <div className='space-y-2 hidden md:block'>
        <Skeleton className='h-4 w-[150px]' />
        <Skeleton className='h-4 w-[100px]' />
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
          <div className='md:hidden'>
            {Array.from({ length: TABLE_LIMIT }, (_, i) => (
              <div key={i} className='mb-4 w-full rounded-md bg-white p-4'>
                <div className='flex items-center justify-between border-b pb-4'>
                  <Skeleton className='w-14 h-4' />

                  <Skeleton className='w-14 h-4' />
                </div>

                <div className='py-4'>
                  <div className='mb-2 flex items-center gap-2'>
                    <Skeleton className='relative size-[40px] min-w-[40px]' />
                    <Skeleton className='w-full h-4' />
                  </div>
                  <Skeleton className='text-sm text-gray-500 flex items-center gap-2 w-10 h-4' />
                </div>

                <div className='flex w-full items-center justify-between pt-4 border-t'>
                  <div className='flex items-center gap-1'>
                    <Skeleton className='w-14 h-4' />
                  </div>
                  <div className='flex justify-end gap-2'>
                    <Skeleton className='w-10 h-4' />
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
              {Array.from({ length: TABLE_LIMIT }, (_, i) => (
                <tr
                  key={i}
                  className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                >
                  <td className='py-3 pl-6'>
                    <div className='flex items-center gap-3 xl:gap-4'>
                      <Skeleton className='relative size-[40px] min-w-[40px]' />

                      <Skeleton className='w-full mr-10 h-4' />
                    </div>
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    <Skeleton className='w-16 h-4' />
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    <Skeleton className='w-10 h-4' />
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    <Skeleton className='w-20 h-4' />
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    <Skeleton className='w-14 h-4' />
                  </td>
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    <div className='flex justify-end gap-3'>
                      <Skeleton className='w-14 h-4' />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <Skeleton
        className={`relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
      </div>
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
        <UpcomingEventsSkeleton />
        <UpcomingEventsSkeleton />
      </div>
    </>
  );
}

function DashboardCardSkeleton() {
  return (
    <Skeleton
      className={`relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className='flex p-4'>
        <div className='h-5 w-5 rounded-md bg-gray-200' />
        <div className='ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium' />
      </div>
      <div className='flex items-center justify-center truncate rounded-xl bg-white px-4 py-8'>
        <div className='h-7 w-20 rounded-md bg-gray-200' />
      </div>
    </Skeleton>
  );
}

export function UpcomingEventsSkeleton() {
  return (
    <Skeleton
      className={'relative flex w-full flex-col overflow-hidden md:col-span-4'}
    >
      <div className='mb-4 h-8 w-36 rounded-md bg-gray-100' />
      <div className='flex grow flex-col justify-between rounded-xl bg-gray-100 p-4'>
        <div className='bg-white px-6'>
          <EventSkeleton />
          <EventSkeleton />
          <EventSkeleton />
          <EventSkeleton />
          <EventSkeleton />
        </div>
        <div className='flex items-center pb-2 pt-6'>
          <div className='h-5 w-5 rounded-full bg-gray-200' />
          <div className='ml-2 h-4 w-20 rounded-md bg-gray-200' />
        </div>
      </div>
    </Skeleton>
  );
}

function EventSkeleton() {
  return (
    <div className='flex flex-row items-center justify-between border-b border-gray-100 py-4'>
      <div className='flex items-center'>
        <div className='mr-2 h-8 w-8 rounded-full bg-gray-200' />
        <div className='min-w-0'>
          <div className='h-5 w-40 rounded-md bg-gray-200' />
          <div className='mt-2 h-4 w-12 rounded-md bg-gray-200' />
        </div>
      </div>
      <div className='mt-2 h-4 w-12 rounded-md bg-gray-200' />
    </div>
  );
}
