import UpdateEvent from '@/components/update-event';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Update Event',
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className='pb-20'>
      <div className='mx-auto space-y-5'>
        <div className=''>
          <div className='max-w-4xl mx-auto px-4 sm:px-8 py-10'>
            <h3 className='text-2xl sm:text-3xl font-semibold text-center'>
              Update Event
            </h3>
          </div>
        </div>
        <div className='px-4 sm:px-8 max-w-4xl mx-auto my-10h'>
          <UpdateEvent eventId={id} />
        </div>
      </div>
    </div>
  );
}
