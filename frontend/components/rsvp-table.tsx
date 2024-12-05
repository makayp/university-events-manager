import { TABLE_LIMIT } from '@/lib/constants';
import { Event, EventTableProps } from '@/lib/declaration';
import Table from './table';
import { getRegisteredEvents } from '@/lib/event-data';

export default async function RsvpTable({
  currentPage,
  eventStatus,
}: EventTableProps) {
  const limit = TABLE_LIMIT;

  const data: { events: Event[]; totalPages: number } =
    await getRegisteredEvents({
      page: currentPage,
      limit,
      status: eventStatus,
    });

  return <Table events={data.events} totalPages={data.totalPages} />;
}
