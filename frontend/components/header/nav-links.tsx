'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { SheetClose } from '../ui/sheet';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Find events', href: '/events' },
  { name: 'Create event', href: '/events/create' },
];

export default function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      className={twMerge(
        'flex flex-col sm:flex-row items-start sm:items-center justify-center gap-6 lg:gap-10',
        className
      )}
    >
      {links.map((link) => (
        <SheetClose asChild key={link.name}>
          <Link
            href={link.href}
            className={clsx(
              'hover:text-accent text-base sm:text-base font-medium opacity-85',
              {
                'text-accent': pathname === link.href,
              }
            )}
          >
            {link.name}
          </Link>
        </SheetClose>
      ))}
    </nav>
  );
}
