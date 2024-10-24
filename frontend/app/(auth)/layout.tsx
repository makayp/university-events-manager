export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex items-center justify-center p-2 min-h-dvh'>
      <div className='w-full'>{children}</div>
    </main>
  );
}
