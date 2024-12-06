'use client';

import { Copy } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { copyText } from '@/lib/utils';
import clsx from 'clsx';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function ShareDialog({
  isOpen,
  setIsOpen,
  url = '',
  isOnDashboard,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
  isOnDashboard?: boolean;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>Share this event with others.</DialogDescription>
        </DialogHeader>
        <div className='flex items-center space-x-2'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='link' className='sr-only'>
              Link
            </Label>
            <Input id='link' value={url} readOnly />
          </div>
          <Button
            type='submit'
            size='sm'
            className={clsx('px-3', {
              'bg-blue-600 border-blue-600 hover:bg-blue-600/90 text-white':
                isOnDashboard,
            })}
            onClick={() => copyText(url)}
          >
            <span className='sr-only'>Copy</span>
            <Copy />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
