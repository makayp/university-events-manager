import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse duration-1000 rounded-md bg-secondary/5',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
