import { auth } from '@/auth';
import { Button } from '../ui/button';
import Link from 'next/link';
import UserDropdown from '../shared/user-dropdown';

export default async function HeaderAction() {
  const session = await auth();

  return (
    <div className='min-w-sm'>
      {!session && (
        <Link href='/login'>
          <Button className='bg-accent hover:bg-accent/90 h-8 md:h-9 md:rounded-md md:px-7'>
            Login
          </Button>
        </Link>
      )}

      {session && <UserDropdown imageSrc={session.user.image} />}
    </div>
  );
}
