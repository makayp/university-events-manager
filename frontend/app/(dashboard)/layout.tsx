import SideNav from '@/components/side-nav';
import SidebarUser from '@/components/sidebar-user';
import { SkeletonSidebarUser } from '@/components/skeleton';
import SessionProvider from '@/context/session-provider';
import { Suspense } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionProvider>
        <main className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
          <div className='w-full flex-none md:w-64 overflow-hidden'>
            <SideNav>
              <Suspense fallback={<SkeletonSidebarUser />}>
                <SidebarUser />
              </Suspense>
            </SideNav>
          </div>
          <div className='flex-grow p-4 md:overflow-y-auto sm:p-6 lg:p-8 max-w-7xl md:mx-auto'>
            {children}
          </div>
        </main>
      </SessionProvider>
    </>
  );
}
