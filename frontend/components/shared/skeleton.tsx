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
