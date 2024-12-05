'use client';

import clsx from 'clsx';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React from 'react';

type FilterProps = {
  filterField: string;
  options: { label: string; value: string }[];
};

export default function Filter({ filterField, options }: FilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get the current filter from URL or default to the first option
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set(filterField, value);

    // Reset page to 1 if the page parameter exists
    if (params.has('page')) {
      params.set('page', '1');
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className='border border-gray-100 rounded-sm p-1 flex gap-2 w-fit'>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
          className={clsx(
            'rounded-sm font-medium text-sm py-1 px-2 transition-all',
            {
              'bg-blue-600 text-white': option.value === currentFilter,
              'hover:bg-gray-100': option.value !== currentFilter,
            }
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
