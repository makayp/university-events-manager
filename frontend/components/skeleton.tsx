import { Skeleton } from './ui/skeleton';

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
