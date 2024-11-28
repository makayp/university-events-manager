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
        <main className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
          <div className='w-full flex-none md:w-64'>{<SideNav />}</div>
          <div className='flex-grow p-4 md:overflow-y-auto sm:p-6 lg:p-8 max-w-7xl md:mx-auto'>
            {children}
          </div>
        </main>
      </SessionProvider>
    </>
  );
}
