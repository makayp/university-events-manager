import Image from 'next/image';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/button';
import { ArrowUpCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ImageUploader({
  onFieldChange,
  imageUrl,
  setImage,
}: {
  imageUrl: string;
  onFieldChange: (value: string) => void;
  setImage: Dispatch<SetStateAction<File | undefined>>;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      try {
        const objectUrl = URL.createObjectURL(file);
        onFieldChange(objectUrl);
        setImage(file);
      } catch (error) {
        console.error('File type error', error);
      }
    },
    [setImage, onFieldChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.heic'] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      onClick={() => {}}
      className='flex flex-col items-center justify-center bg-slate-50 h-64 cursor-pointer overflow-hidden rounded-xl relative'
    >
      <input {...getInputProps()} />

      {imageUrl ? (
        <div className='flex h-full w-full flex-1 justify-center '>
          <Image
            src={imageUrl}
            alt='preview'
            width={250}
            height={250}
            priority
            className='w-full object-cover object-center'
          />
        </div>
      ) : (
        <div className='flex items-center gap-5 flex-col py-5 text-grey-500'>
          <ArrowUpCircleIcon className='size-16 text-secondary/30' />

          {!imageUrl && (
            <div className='text-gray-400 max-w-xs text-center'>
              {isDragActive ? (
                <p>Drop the image here...</p>
              ) : (
                <p>Drag and drop an image here, or click below to select one</p>
              )}
            </div>
          )}
          <Button
            type='button'
            onClick={getRootProps().onClick}
            className='rounded-full'
          >
            Select from device
          </Button>
        </div>
      )}
      {imageUrl && (
        <Button
          type='button'
          variant='destructive'
          size='sm'
          className='absolute top-2 right-2'
          onClick={(e) => {
            e.stopPropagation();
            onFieldChange('');
            setImage(undefined);
          }}
        >
          <TrashIcon />
          Remove
        </Button>
      )}
    </div>
  );
}
