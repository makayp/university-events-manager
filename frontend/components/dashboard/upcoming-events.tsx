export default function UpcomingEvents({ title }: { title: string }) {
  return (
    <div className='flex w-full flex-col md:col-span-4'>
      <h2 className={'mb-4 text-xl md:text-2xl'}>{title}</h2>
      <div className='flex grow flex-col justify-between rounded-xl bg-gray-50 p-4'>
        <div className='bg-white px-6 min-h-[20rem] flex items-center justify-center'>
          Coming Soon.
        </div>
      </div>
    </div>
  );
}
