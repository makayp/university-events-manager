import { UserIcon } from '@heroicons/react/24/outline';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function UserAvatar({
  imageSrc,
}: {
  imageSrc: string | null | undefined;
}) {
  return (
    <Avatar className='size-8 ring-1 ring-offset-1 ring-gray-900/10'>
      <AvatarImage src={imageSrc || ''} />
      <AvatarFallback>
        <UserIcon className='size-5 text-gray-400' />
      </AvatarFallback>
    </Avatar>
  );
}
