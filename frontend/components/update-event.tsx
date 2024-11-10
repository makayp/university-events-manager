import { EventData } from '@/lib/declaration';
import EventForm from './event-form';
import { getEventById } from '@/lib/action';
import { EventFormSchema } from '@/lib/zod';
import { z } from 'zod';

export default async function UpdateEvent({ eventId }: { eventId: string }) {
  const eventData: EventData = await getEventById(eventId);

  const event: z.infer<typeof EventFormSchema> = {
    ...eventData,
    start_time: new Date(eventData.start_time),
    end_time: new Date(eventData.end_time),
  };
  return <EventForm type='Update' event={event} eventId={eventId} />;
}
