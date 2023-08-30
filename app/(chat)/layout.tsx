import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className='mx-auto max-w-4xl h-screen w-screen'>{children}</div>;
};

export default Layout;
