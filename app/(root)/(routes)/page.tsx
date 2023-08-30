import Categories from '@/components/categories';
import Companions from '@/components/companions';
import SearchInput from '@/components/search-input';
import prismaDB from '@/lib/prismadb';

interface HomePageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home({ searchParams }: HomePageProps) {
  const data = await prismaDB.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });
  const categories = await prismaDB.category.findMany();
  return (
    <div className='h-screen p-4 space-y-2'>
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
}
