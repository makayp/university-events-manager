export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='p-2 space-y-10 md:space-y-36'>
      <header className='bg-primary rounded-md p-5 leading-none'>
        <h1 className='text-white text-4xl font-serif sm:mt-12'>Logo</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
