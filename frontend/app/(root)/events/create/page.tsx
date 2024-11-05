import EventForm from '@/components/event-form';

export default function Page() {
  return (
    <div className='pb-20'>
      <div className='mx-auto md:space-y-5'>
        <div className=''>
          <div className='max-w-4xl mx-auto px-4 sm:px-8 py-10'>
            <h3 className='text-xl sm:text-2xl font-semibold'>Create Event</h3>
          </div>
        </div>
        <div className='px-4 sm:px-8 max-w-4xl mx-auto my-10h'>
          <EventForm type='Create' />
        </div>
      </div>
    </div>
  );
}
