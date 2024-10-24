import Link from 'next/link';
import { Button } from '../ui/button';
import MobileMenu from './MobileMenu';
import NavLinks from './NavLinks';
import { Input } from '../ui/input';

export default function Header() {
  return (
    <header className='flex items-center justify-between gap-5 lg:gap-20 px-3 sm:px-5 lg:px-7 py-2.5 bg-background border-b'>
      <div>
        <Link href='/'>
          <h1 className='text-xl'>Events</h1>
        </Link>
      </div>
      <div className='flex-1 flex items-center justify-center'>
        <Input
          placeholder='Search...'
          className='w-4/5 focus:w-full transition-all shadow-none outline-none  rounded-full bg-slate/5 text-[1rem] focus-visible:border-accent/50 focus-visible:ring-0 bg-gray-50'
        />
      </div>
      <NavLinks />

      <Button
        asChild
        className='bg-accent hover:bg-accent/90 md:h-10 md:rounded-md md:px-8'
      >
        <Link href='/login'>Login</Link>
      </Button>
      <MobileMenu />
    </header>
  );
}
