import Link from 'next/link';
import DashboardLinks from './dashboard-links';

export default function SideNav() {
  return (
    <div className='bg-white flex h-full flex-col border-r border-gray-200'>
      <Link
        className='flex h-20 items-end justify-start bg-primary p-4 md:h-40'
        href='/'
      >
        <div className='w-32 text-white md:w-40'>
          <h1 className='text-2xl font-semibold'>EventHub</h1>
        </div>
      </Link>
      <div className='md:mt-5 flex grow flex-row justify-between md:flex-col rounded-md overflow-hidden'>
        <DashboardLinks />

        <div className='hidden h-auto w-full grow rounded-md md:block'></div>
        {/* <Button>Logout</Button> */}
      </div>
    </div>
  );
}
