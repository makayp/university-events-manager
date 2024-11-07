import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className=''>
        <div className='w-full'>{children}</div>
      </main>
      <Footer />
    </>
  );
}
