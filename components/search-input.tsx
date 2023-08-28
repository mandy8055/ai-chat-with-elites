'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import qs from 'query-string';

import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/use-debounce';

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get('categoryId');
  const name = searchParams.get('name');
  const [value, setValue] = useState(name || '');
  const debouncedValue = useDebounce<string>(value, 500);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      name: debouncedValue,
      categoryId,
    };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true, skipEmptyString: true },
    );
    router.push(url);
  }, [debouncedValue, router, categoryId]);

  return (
    <div className='relative'>
      <Search className='absolute h-4 w-4 top-3 left-4 text-muted-foreground' />
      <Input
        placeholder='Search...'
        className='pl-10 bg-primary/10'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
