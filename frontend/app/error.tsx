'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function Error() {
  const router = useRouter();

  return (
    <div className='container text-center py-20 space-y-1'>
      <h3
        className='text-lg font-medium
      '
      >
        Something went wrong ☹️
      </h3>
      <p className='text'>
        Something went wrong on the server. Please try again later.
      </p>

      <Button
        type='button'
        className=''
        onClick={() => {
          router.push('/');
        }}
      >
        Try again
      </Button>
    </div>
  );
}
