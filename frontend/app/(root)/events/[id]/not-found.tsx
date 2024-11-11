import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex items-center justify-center py-20'>
      <div className='flex flex-col gap-2 text-center'>
        <h2 className='text-lg font-semibold'>404 - Event Not Found</h2>
        <p>Could not find the requested event </p>
        <Link href='/'>
          <Button size='lg' className='rounded-full mt-5'>
            View all events &rarr;
          </Button>
        </Link>
      </div>
    </div>
  );
}
