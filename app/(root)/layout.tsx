import { Navbar } from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { checkSubscription } from '@/lib/subscription';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const isPro = await checkSubscription();

  return (
    <div className='h-screen'>
      <Navbar isPro={isPro} />
      <div className='hidden md:flex mt-16 h-screen w-20 flex-col fixed inset-y-0'>
        <Sidebar isPro={isPro} />
      </div>
      <main className='md:pl-20 pt-16 h-screen'>{children}</main>
    </div>
  );
};

export default RootLayout;
