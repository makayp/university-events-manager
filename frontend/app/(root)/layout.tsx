import Header from '@/components/header/header';

// export const dynamic = 'force-dynamic';

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
    </>
  );
}
