import prismaDB from '@/lib/prismadb';
import CompanionForm from './components/companion-form';

interface CompanionIdProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdProps) => {
  // TODO: Check subscription

  const companion = await prismaDB.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });

  const categories = await prismaDB.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
