import Link from 'next/link';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Create event', href: '/event/create' },
];

export default function NavLinks() {
  return (
    <nav className='hidden sm:block'>
      <ul className='flex items-center justify-center gap-6'>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className='hover:text-accent opacity-80 font-serif tracking-tight'
            >
              {' '}
              {link.name}{' '}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
