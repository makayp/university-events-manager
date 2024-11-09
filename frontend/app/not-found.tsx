import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex items-center justify-center min-h-dvh'>
      <div className='flex flex-col gap-2 text-center'>
        <h2 className='text-lg font-semibold'>404 - Page Not Found</h2>
        <p>Could not find the requested resource. </p>
        <Link href='/'>
          <Button size='lg' className='rounded-full mt-5'>
            Return to EventHub
          </Button>
        </Link>
      </div>
    </div>
  );
}
