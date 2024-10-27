import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Sheet } from '../ui/sheet';
import { Skeleton } from '../ui/skeleton';
import HeaderAction from './header-action';
import MobileMenu from './mobile-menu';
import NavLinks from './nav-links';

export default function Header() {
  return (
    <header className='flex items-center justify-between gap-5 lg:gap-20 px-3 sm:px-5 lg:px-14 xl:px-20 py-2.5 bg-background border-b h-[55px] sm:h-[70px]'>
      <div>
        <Link href='/'>
          <h1 className='text-2xl font-serif font-medium'>Events</h1>
        </Link>
      </div>
      <div className='flex-1 flex items-center justify-center'>
        <div className='relative inline-flex items-center w-4/5 focus-within:w-full transition-all group'>
          <Input
            placeholder='Search...'
            className='shadow-none outline-none rounded-full bg-slate/5 text-[1rem] focus-visible:border-accent/50 focus-visible:ring-0 bg-gray-50 pr-10'
          />
          <Button
            type='submit'
            variant='outline'
            className='absolute text-sm text-white/90 hover:text-white bg-accent hover:bg-accent/90 p-1 rounded-full right-1 transition-all duration-200 h-fit border-none'
          >
            <span className='text-sm pl-2 hidden xl:block'>Search</span>
            <MagnifyingGlassIcon className='size-3' />{' '}
          </Button>
        </div>
      </div>

      <Sheet>
        <NavLinks className='hidden sm:flex' />
      </Sheet>

      <Suspense fallback={<Skeleton className='w-14 h-4 rounded-xl' />}>
        <HeaderAction />
      </Suspense>

      <MobileMenu />
    </header>
  );
}
