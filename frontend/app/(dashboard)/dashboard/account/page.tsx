import AccountUpdateForm from '@/components/dashboard/account-update-form';
import Spinner from '@/components/shared/spinner';
import { Suspense } from 'react';

export default function Page() {
  return (
    <section className='relative min-h-full'>
      <div className='space-y-10 grow'>
        <h1 className='text-xl'>Account</h1>
        <Suspense
          fallback={
            <div className='flex items-center justify-center absolute inset-0'>
              <Spinner size='x-large' />
            </div>
          }
        >
          <div className='space-y-28 [&_input]:shadow-none'>
            <AccountUpdateForm />
          </div>
        </Suspense>
      </div>
    </section>
  );
}
