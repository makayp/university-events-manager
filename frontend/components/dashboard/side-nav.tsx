'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DASHBOARD_LINKS } from '@/lib/constants';

export default function SideNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2'>
      <Link
        className='mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40'
        href='/'
      >
        <div className='w-32 text-white md:w-40'>
          <h1 className='text-xl font-medium'>EventHub</h1>
        </div>
      </Link>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        {DASHBOARD_LINKS.map((link) => {
          const LinkIcon = link.icon;

          const name = link.name === 'Dashboard' ? 'Overview' : link.name;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                { 'bg-sky-100 text-blue-600': pathname === link.href }
              )}
            >
              <LinkIcon className='w-6' />
              <p className='hidden md:block'>{name}</p>
            </Link>
          );
        })}
        <div className='hidden h-auto w-full grow rounded-md bg-gray-50 md:block'></div>

        <div className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 text-sm hover:bg-gray-900/5 md:flex-none md:justify-start md:p-2 [&_svg]:size-4 [&_svg]:shrink-0'>
          {children}
        </div>
      </div>
    </div>
  );
}
