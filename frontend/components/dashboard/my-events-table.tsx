import { TABLE_LIMIT } from '@/lib/constants';
import { Event, EventTableProps } from '@/lib/declaration';
import Table from './table';
import { getUserEvents } from '@/lib/event-data';

export default async function MyEventsTable({
  currentPage,
  eventStatus,
}: EventTableProps) {
  const limit = TABLE_LIMIT;

  const data: { events: Event[]; totalPages: number } = await getUserEvents({
    page: currentPage,
    limit,
    status: eventStatus,
    type: 'created',
  });

  return <Table events={data.events} totalPages={data.totalPages} />;
}
