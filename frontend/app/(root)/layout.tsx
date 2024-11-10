import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import SessionProvider from '@/context/session-provider';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionProvider>
        <div className='h-dvh flex flex-col'>
          <Header />
          <main className='flex-1'>
            <div className='w-full'>{children}</div>
          </main>
          <Footer />
        </div>
      </SessionProvider>
    </>
  );
}
