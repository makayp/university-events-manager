'use client';

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as SelectWrapper,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { debounce } from './search';

const searchFields = [
  { name: 'Event name', value: 'event_name' },
  { name: 'Description', value: 'description' },
  { name: 'Location', value: 'location' },
];

export function Select({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const [searchBy, setSearchBy] = useState<string>(
    searchParams.get('searchBy') || ''
  );

  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useCallback(
    debounce(function (selected: string) {
      const params = new URLSearchParams(searchParams);

      if (selected.trim()) {
        params.set('searchBy', selected);
        params.set('page', '1');
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500),
    [pathname, router, searchParams]
  );

  function onSelectChange(e: string) {
    setSearchBy(e);
    handleSearch(e);
  }

  return (
    <SelectWrapper onValueChange={onSelectChange} defaultValue={searchBy}>
      <SelectTrigger
        className={twMerge(
          'w-fit gap-1 absolute right-1 shadow-none border-none rounded-full text-black/70 focus:ring-0',
          className
        )}
      >
        <SelectValue placeholder='Search by' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {searchFields.map((field) => (
            <SelectItem
              key={field.name}
              value={field.value}
              className='focus:bg-secondary/10 flex'
            >
              {field.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectWrapper>
  );
}
