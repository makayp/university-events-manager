import { Event } from '@/lib/declaration';
import Card from './card';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export async function EventSlider({
  events,
  className,
}: {
  events: Event[];
  className?: string;
}) {
  return (
    <ScrollArea className={className}>
      <div className='flex w-full gap-5'>
        {events.map((event) => (
          <figure key={event.id} className='flex-none w-[320px]'>
            <div className='w-full py-5 px-1'>
              <Card event={event} />
            </div>
          </figure>
        ))}
        <div className='w-5'></div>
      </div>
      <ScrollBar orientation='horizontal' className='opacity-80' />
    </ScrollArea>
  );
}
