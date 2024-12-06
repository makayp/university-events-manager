import EventForm from '../event/event-form';
import { getEventById } from '@/lib/event-data';
import { EventFormSchema } from '@/lib/zod';
import { z } from 'zod';

export default async function UpdateEvent({ eventId }: { eventId: string }) {
  const data = await getEventById(eventId);
  const eventData = data.event;

  const event: z.infer<typeof EventFormSchema> = {
    ...eventData,
    start_time: new Date(eventData.start_time),
    end_time: new Date(eventData.end_time),
  };
  return <EventForm type='Update' event={event} eventId={eventId} />;
}
