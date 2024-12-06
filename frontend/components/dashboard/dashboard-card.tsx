import { getDashboardStats } from '@/lib/event-data';
import {
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { CalendarDays, Ticket } from 'lucide-react';

const iconMap = {
  registered: Ticket,
  created: UserGroupIcon,
  upcoming: CalendarDays,
  soon: ClockIcon,
};

export default async function DashboardCard() {
  const { upcoming, totalCreated, totalRegistered } = await getDashboardStats();

  return (
    <>
      <Card title='Upcoming' value={upcoming.length} type='upcoming' />
      <Card title='Total Created' value={totalCreated} type='created' />
      <Card
        title='Total Registered'
        value={totalRegistered}
        type='registered'
      />
      <Card title='Coming soon' value={0} type='soon' />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'created' | 'registered' | 'upcoming' | 'soon';
}) {
  const Icon = iconMap[type];

  return (
    <div className='rounded-xl bg-gray-50 p-2 shadow-sm'>
      <div className='flex p-4'>
        {Icon ? <Icon className='h-5 w-5 text-gray-700' /> : null}
        <h3 className='ml-2 text-sm font-medium'>{title}</h3>
      </div>
      <p
        className={
          'truncate rounded-xl bg-white px-4 py-8 text-center text-2xl'
        }
      >
        {value}
      </p>
    </div>
  );
}
