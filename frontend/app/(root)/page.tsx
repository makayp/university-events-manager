import { EventSlider } from '@/components/event-carousel';
import EventsCollection from '@/components/events-collection';
import { Button } from '@/components/ui/button';
import { getEvents } from '@/lib/action';
import heroImage from '@/public/images/hero-image.jpg';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const events = await getEvents(6);
  return (
    <main>
      <section className='md:container md:mt-6 min-h-[500px] md:min-h-[400px] lg:min-h-[450px] flex flex-col'>
        <div className='py-8 bg-black/90 flex-1 flex flex-col justify-end relative md:rounded-2xl overflow-hidden'>
          <Image
            src={heroImage}
            fill
            alt='hero image'
            className='object-cover object-center [mask-image:linear-gradient(to_bottom,black_20%,transparent)] z-0'
          />
          <div className='px-3 sm:container md:px-7'>
            <div className='flex flex-col gap-2 max-w-lg'>
              <h1 className='text-2xl md:text-[26px] lg:text-3xl font-semibold leading-8 text-white/85 z-10'>
                Unite, Engage, Succeed: Your Hub for Campus Events.
              </h1>
              <p className='text-white/75 z-10'>
                Welcome to EventHub, the one-stop platform for discovering,
                organizing, and managing university events.
                {/* From academic seminars to social gatherings, we make it easy to
              explore upcoming events, connect with peers, and create memorable
              campus experiences. Join us in building a vibrant, engaged
              community! */}
              </p>
              <div>
                <Link href='/events'>
                  <Button
                    size='lg'
                    className='rounded-full mt-4 px-8 h-12 lg:px-12 z-50 relative bg-primary/80'
                  >
                    Explore now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='py-20'>
        <div className='container flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <h1 className='text-[22px] md:text-2xl font-semibold'>
              Upcoming Events
            </h1>
            <Link href='/events' className='md:hidden'>
              <Button variant='link' className='underline'>
                View more <ArrowRightIcon />
              </Button>
            </Link>
          </div>
          <div>
            <EventsCollection events={events} className='hidden md:block' />
            <EventSlider className='md:hidden' />
          </div>
        </div>
        <div className='mt-10 md:flex items-center justify-center hidden '>
          <Link href='/events'>
            <Button size='lg' className='rounded-full px-10 h-12'>
              View more <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
