import Logo from '../header/logo';

export default function Footer() {
  return (
    <footer>
      <div className='container flex flex-col gap-2 sm:flex-row sm:justify-between items-center text-center py-4 md:py-8 border-t'>
        <Logo />
        <div>&copy; {new Date().getFullYear()}. All rights reserved.</div>
      </div>
    </footer>
  );
}
