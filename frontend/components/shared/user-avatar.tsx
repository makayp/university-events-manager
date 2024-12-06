import { UserIcon } from '@heroicons/react/24/outline';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { twMerge } from 'tailwind-merge';

export default function UserAvatar({
  imageSrc,
  className,
}: {
  imageSrc: string | null | undefined;
  className?: string;
}) {
  return (
    <Avatar
      className={twMerge(
        'size-8 ring-1 ring-offset-1 ring-gray-900/10',
        className
      )}
    >
      <AvatarImage src={imageSrc || ''} />
      <AvatarFallback>
        <UserIcon className='size-5 text-gray-400' />
      </AvatarFallback>
    </Avatar>
  );
}
