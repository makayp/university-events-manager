import clsx from 'clsx';

export default function Spinner({
  size,
  color = 'light',
}: {
  size: 'small' | 'large';
  color?: 'dark' | 'light' | 'primary';
}) {
  if (size == 'small')
    return (
      <div
        className={clsx(
          'inline-block size-[18px] animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]',
          {
            'text-gray-200': color === 'light',
            'text-gray-500': color === 'dark',
            'text-primary/70': color === 'primary',
          }
        )}
        role='status'
      >
        <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
          Loading...
        </span>
      </div>
    );
}
