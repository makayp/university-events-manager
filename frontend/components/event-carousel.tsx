import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { getEvents } from '@/lib/action';
import { EventData } from '@/lib/declaration';
import Card from './card';

export default async function EventCarousel() {
  const events: EventData[] = await getEvents(6);

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className='w-full'
    >
      <CarouselContent>
        {events.map((event) => (
          <CarouselItem key={event.id} className='md:basis-1/2 lg:basis-1/3 '>
            <div className='p-1'>
              <Card event={event} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export async function EventSlider({ className }: { className?: string }) {
  const events: EventData[] = await getEvents(6);
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
