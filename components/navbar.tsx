'use client';
import { Sparkles } from 'lucide-react';
import { Poppins } from 'next/font/google';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import MobileSidebar from '@/components/mobile-sidebar';
import { useProModalStore } from '@/hooks/use-pro-modal';

const font = Poppins({
  weight: '600',
  subsets: ['latin'],
});

interface NavbarProps {
  isPro: boolean;
}

const Navbar = ({ isPro }: NavbarProps) => {
  const proModal = useProModalStore();
  return (
    <div className='fixed w-screen z-50 flex justify-between items-center py-2 px-4 h-16 border-b border-primary/10 bg-secondary'>
      <div className='flex items-center'>
        <MobileSidebar isPro={isPro} />
        <Link href='/'>
          <h1
            className={cn(
              'hidden md:block text-xl md:text-3xl font-bold text-primary',
              font.className,
            )}
          >
            ai.chat-with-elites
          </h1>
        </Link>
      </div>
      <div className='flex items-center gap-x-3 mr-2'>
        {!isPro && (
          <Button variant='premium' size='sm' onClick={proModal.onOpen}>
            Upgrade
            <Sparkles className='h-4 w-4 fill-white text-white ml-2' />
          </Button>
        )}
        <ModeToggle />
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
};

export default Navbar;
