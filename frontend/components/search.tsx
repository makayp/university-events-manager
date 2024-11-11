'use client';

import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Input } from './ui/input';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useCallback, useState } from 'react';
import { Select } from './select';

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function Search() {
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState<string>(
    searchParams.get('query') || ''
  );
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useCallback(
    debounce(function (query: string) {
      const params = new URLSearchParams(searchParams);

      if (query.trim()) {
        params.set('query', query);
        params.set('page', '1');
      } else {
        params.delete('query');
        params.delete('page');
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500),
    [pathname, router, searchParams]
  );

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
    handleSearch(e.target.value);
  }

  return (
    <div className='flex '>
      <div className='relative flex items-center w-full  max-w-3xl mx-auto'>
        <MagnifyingGlassIcon className='size-5 top-1/2 -translate-y-1/2 left-3 absolute opacity-60' />
        <Input
          placeholder='Search'
          value={searchText}
          onChange={onInputChange}
          className='rounded-full pl-10 h-10 lg:h-10 shadow-none text-gray-700 border-noneh bg-gray-50k'
        />

        <Select />
      </div>
    </div>
  );
}
