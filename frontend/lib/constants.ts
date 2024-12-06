import {
  CalendarDaysIcon,
  ChartPieIcon,
  TicketIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

export const MAX_FILE_SIZE = 2;

export const DASHBOARD_LINKS = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartPieIcon },
  { name: 'My events', href: '/dashboard/my-events', icon: CalendarDaysIcon },
  {
    name: 'RSVPs',
    href: '/dashboard/rsvps',
    icon: TicketIcon,
  },

  { name: 'Account', href: '/dashboard/account', icon: UserIcon },
];

export const TABLE_LIMIT = 8;
