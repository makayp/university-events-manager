import Image from 'next/image';
import LogoImage from '@/public/images/logo.png';

export default function Logo() {
  return (
    <h1 className='text-xl font-medium'>
      <Image src={LogoImage} alt='Logo' className='w-[7rem] sm:w-[7.3rem]' />
    </h1>
  );
}
