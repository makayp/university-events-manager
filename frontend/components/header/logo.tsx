import Image from 'next/image';
import LogoImage from '@/public/images/logo.png';
import { twMerge } from 'tailwind-merge';

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={LogoImage}
      priority
      alt='Logo'
      className={twMerge('w-[7rem] sm:w-[7.3rem]', className)}
    />
  );
}
