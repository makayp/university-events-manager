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
        <Header />
        <main className='min-h-dvh'>
          <div className='w-full'>{children}</div>
        </main>
        <Footer />
      </SessionProvider>
    </>
  );
}
