import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function UserAvatar({ imageSrc }: { imageSrc: string }) {
  return (
    <Avatar className='size-9 ring-1 ring-offset-1 ring-gray-900/10'>
      <AvatarImage src={imageSrc} />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
}
