import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen'>
      <Navbar />
      <div className='hidden md:flex mt-16 h-screen w-20 flex-col fixed inset-y-0'>
        <Sidebar />
      </div>
      <main className='md:pl-20 pt-16 h-screen'>{children}</main>
    </div>
  );
};

export default RootLayout;
