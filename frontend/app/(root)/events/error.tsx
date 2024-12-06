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
    <div className='container text-center py-20 space-y-3'>
      <div>
        <h3
          className='text-lg font-medium
      '
        >
          Something went wrong ☹️
        </h3>
        <p className='text'>An error occured. Please try again.</p>
      </div>

      <Button
        onClick={() => {
          router.push('/');
        }}
      >
        Try again
      </Button>
    </div>
  );
}
