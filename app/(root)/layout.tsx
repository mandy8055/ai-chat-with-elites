import Navbar from '@/components/Navbar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen'>
      <Navbar />
      <main className='md:pl-20 pt-16 h-screen'>{children}</main>
    </div>
  );
};

export default RootLayout;
