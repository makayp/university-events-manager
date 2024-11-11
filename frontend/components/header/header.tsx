import Link from 'next/link';
import { Suspense } from 'react';
import { Sheet } from '../ui/sheet';
import { Skeleton } from '../ui/skeleton';
import HeaderAction from './header-action';
import MobileMenu from './mobile-menu';
import NavLinks from './nav-links';
import Logo from './logo';

export default function Header() {
  return (
    <header className='flex items-center justify-between gap-5 lg:gap-20 px-3 sm:px-5 lg:px-14 xl:px-20 py-2.5 bg-background border-b h-[55px] sm:min-h-[65px]'>
      <div>
        <Link href='/'>
          <Logo />
        </Link>
      </div>

      <Sheet>
        <NavLinks className='hidden sm:flex' />
      </Sheet>

      <div className='flex items-center gap-5'>
        <Suspense fallback={<Skeleton className='w-14 h-4 rounded-xl' />}>
          <HeaderAction />
        </Suspense>

        <MobileMenu />
      </div>
    </header>
  );
}
