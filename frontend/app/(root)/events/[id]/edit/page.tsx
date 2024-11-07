import EventForm from '@/components/event-form';
import { getEventById } from '@/lib/action';
import { EventData } from '@/lib/declaration';
import { EventFormSchema } from '@/lib/zod';
import { z } from 'zod';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = await getEventById(id);

  //Fix types
  // const eventData: z.infer<typeof EventFormSchema> = {
  //   ...event,
  //   startDateTime: new Date(event.start_date),
  //   endDateTime: new Date(event.end_date),
  // };

  const eventData = {
    ...event,
    startDateTime: new Date(event.start_date),
    endDateTime: new Date(event.end_date),
  };

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
          <EventForm type='Update' event={eventData} />
        </div>
      </div>
    </div>
  );
}
