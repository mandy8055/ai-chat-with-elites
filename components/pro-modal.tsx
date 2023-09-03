'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { useProModalStore } from '@/hooks/use-pro-modal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export const ProModal = () => {
  const proModal = useProModalStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // to get rid of hydration if it happens

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');
      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className='space-y-4'>
          <DialogTitle className='text-center'>Upgrade to Pro</DialogTitle>
          <DialogDescription className='text-center space-y-2'>
            Create
            <span className='text-sky-500 mx-1 font-medium'>Custom AI</span>
            Companions!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className='flex justify-between'>
          <p className='text-2xl font-medium'>
            ₹150<span className='text-sm font-normal'>.00 / mo</span>
          </p>
          <Button onClick={onSubscribe} disabled={loading} variant='premium'>
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
