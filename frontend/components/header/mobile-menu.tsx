import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import NavLinks from './nav-links';

export default function MobileMenu() {
  return (
    <div className='sm:hidden flex items-center'>
      <Sheet>
        <SheetTrigger className='focus-within:outline-none'>
          <Bars3BottomLeftIcon className='size-8 ring-0 -ml-2' />
        </SheetTrigger>
        <SheetContent className='flex flex-col gap-12 sm:hidden'>
          <SheetHeader>
            <SheetTitle className='text-left'>Events</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <NavLinks />
        </SheetContent>
      </Sheet>
    </div>
  );
}
