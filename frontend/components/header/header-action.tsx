import { auth } from '@/auth';
import { Button } from '../ui/button';
import Link from 'next/link';
import UserDropdown from '../user-dropdown';

export default async function HeaderAction() {
  const session = await auth();

  return (
    <div className='min-w-sm'>
      {!session && (
        <Button
          asChild
          className='bg-accent hover:bg-accent/90 h-8 md:h-10 md:rounded-md md:px-8'
        >
          <Link href='/login'>Login</Link>
        </Button>
      )}

      {session && <UserDropdown imageSrc={session.user.image} />}
    </div>
  );
}
