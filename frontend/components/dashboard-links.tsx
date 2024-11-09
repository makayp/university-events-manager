'use client';

import Link from 'next/link';
import { profileLinks } from './user-dropdown';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const links = profileLinks;

export default function DashboardLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-primary/10 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3 transition-colors',
              { 'bg-primary/10 text-primary': pathname === link.href }
            )}
          >
            <LinkIcon className='w-6' />
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
