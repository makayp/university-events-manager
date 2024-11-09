import DashboardHeader from '@/components/header/dashboard-header';
import SideNav from '@/components/side-nav';
import SessionProvider from '@/context/session-provider';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionProvider>
        <main className='flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-50'>
          <div className='w-full flex-none md:w-64'>{<SideNav />}</div>
          <div className='grow'>
            <div className='hidden md:block'>
              <DashboardHeader />
            </div>
            <div className='px-5 py-3 md:overflow-y-auto md:p-12'>
              {children}
            </div>
          </div>
        </main>
      </SessionProvider>
    </>
  );
}
