import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deleteEvent } from '@/lib/action';
import { SetStateAction } from 'react';

export default function ConfirmDialog({
  isOpen,
  setIsOpen,
  action,
  children,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  action: string;
  children: React.ReactNode;
}) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            event's data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancel
          </AlertDialogCancel>
          {children}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
