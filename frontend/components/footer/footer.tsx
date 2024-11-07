export default function Footer() {
  return (
    <footer>
      <div className='container flex flex-col gap-2 md:flex-row md:justify-between text-center py-3 border-t'>
        <div>EventHub</div>
        <div>&copy; {new Date().getFullYear()}. All rights reserved.</div>
      </div>
    </footer>
  );
}
