import EventsList from '@/components/event/events-list';
import { Button } from '@/components/ui/button';
import heroImage from '@/public/images/hero-image.jpg';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  return (
    <>
      <section className='md:container md:mt-6 min-h-[500px] md:min-h-[400px] lg:min-h-[450px] flex flex-col'>
        <div className='py-8 bg-black/90 flex-1 flex flex-col justify-end relative md:rounded-2xl overflow-hidden'>
          <Image
            src={heroImage}
            fill
            priority
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
                    className='rounded-full mt-4 px-8 h-12 lg:px-12 z-50 relative bg-primary'
                  >
                    Explore now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='pt-20'>
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
            <div className='hidden md:block'>
              <EventsList type='collection' numEvents={12} />
            </div>
            <div className='md:hidden'>
              <EventsList type='slider' numEvents={12} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
