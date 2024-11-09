import { Copy } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { copyText } from '@/lib/utils';

export default function ShareDialog({
  isOpen,
  setIsOpen,
  url = '',
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  url?: string;
}) {
  const [pageUrl, setPageUrl] = useState<string>('');

  useEffect(function () {
    setPageUrl(window.location.href);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center space-x-2'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='link' className='sr-only'>
              Link
            </Label>
            <Input
              id='link'
              // defaultValue='https://ui.shadcn.com/docs/installation'
              value={url || pageUrl}
              readOnly
            />
          </div>
          <Button
            type='submit'
            size='sm'
            className='px-3'
            onClick={() => copyText(pageUrl)}
          >
            <span className='sr-only'>Copy</span>
            <Copy />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
