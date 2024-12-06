import DashboardCard from '@/components/dashboard/dashboard-card';
import UpcomingEvents from '@/components/dashboard/upcoming-events';
import { UpcomingEventsSkeleton } from '@/components/shared/skeleton';
import { Suspense } from 'react';

export default function Page() {
  return (
    <section className='relative min-h-full'>
      <div className='space-y-10 grow'>
        <h1 className='text-xl'>Dashboard</h1>
      </div>
      <div className='mt-6'>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          <DashboardCard />
        </div>
        <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
          <Suspense
            key={'upcoming-events-skeleton'}
            fallback={<UpcomingEventsSkeleton />}
          >
            <UpcomingEvents title='Upcoming Events' />
          </Suspense>
          <Suspense
            key={'recent-activities-skeleton'}
            fallback={<UpcomingEventsSkeleton />}
          >
            <UpcomingEvents title='Recent Activities' />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
