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
          <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>
            {children}
          </div>
        </main>
      </SessionProvider>
    </>
  );
}
