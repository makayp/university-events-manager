import { EventStatusProps } from '@/lib/declaration';
import {
  CheckIcon,
  ClockIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const statusConfig = {
  past: {
    label: 'Past',
    bgColor: 'bg-gray-300',
    textColor: 'text-gray-700',
    Icon: CheckIcon,
  },
  ongoing: {
    label: 'Ongoing',
    bgColor: 'bg-yellow-500',
    textColor: 'text-white',
    Icon: ClockIcon,
  },
  upcoming: {
    label: 'Upcoming',
    bgColor: 'bg-green-500',
    textColor: 'text-white',
    Icon: CalendarIcon,
  },
};

export default function EventStatus({ status }: { status: EventStatusProps }) {
  const { label, bgColor, textColor, Icon } = statusConfig[status] || {
    label: 'Unknown',
    bgColor: 'bg-gray-200',
    textColor: 'text-gray-700',
    Icon: ClockIcon,
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        bgColor,
        textColor
      )}
    >
      {label}
      <Icon className={clsx('ml-2 w-4 h-4', textColor)} />
    </span>
  );
}
