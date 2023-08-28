import Categories from '@/components/categories';
import SearchInput from '@/components/search-input';
import prismaDB from '@/lib/prismadb';

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const categories = await prismaDB.category.findMany();
  return (
    <div className='h-screen p-4 space-y-2'>
      <SearchInput />
      <Categories data={categories} />
    </div>
  );
}
