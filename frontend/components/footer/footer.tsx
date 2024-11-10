export default function Footer() {
  return (
    <footer>
      <div className='container flex flex-col gap-2 sm:flex-row sm:justify-between items-center text-center py-8 border-t'>
        <p className='font-medium text-base sm:text-lg'>EventHub</p>
        <div>&copy; {new Date().getFullYear()}. All rights reserved.</div>
      </div>
    </footer>
  );
}
