'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ChangePasswordSchema, UpdateAccountSchema } from '@/lib/zod';
import { useRef, useState } from 'react';

import { useToast } from '@/hooks/use-toast';
import { changePassword, updateAccount } from '@/lib/action';
import { checkFileSize } from '@/lib/utils';
import Warning from '@/public/icons/warning.svg';
import { UserIcon } from '@heroicons/react/24/outline';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import { MAX_FILE_SIZE } from '../lib/constants';
import PasswordValidation from './password-validation';
import Spinner from './spinner';

export function UpdateUserData({
  user,
}: {
  user: z.infer<typeof UpdateAccountSchema>;
}) {
  const [image, setImage] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof UpdateAccountSchema>>({
    resolver: zodResolver(UpdateAccountSchema),
    defaultValues: user,
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof UpdateAccountSchema>) {
    const updatedUser = { ...values, image };

    if (image) {
      const fileSize = checkFileSize(image);

      if (fileSize && fileSize > MAX_FILE_SIZE) {
        form.setError('root', {
          message: 'Image must be less than 2MB',
        });
        return;
      }
    }

    const response: { success?: string; error?: string } = await updateAccount(
      updatedUser
    );

    if (response?.error) {
      form.setError('root', {
        message: response.error,
      });
    }

    if (response?.success) {
      toast({
        title: 'Success',
        description: response.success,
      });
    }
  }

  function handleFileChange(
    acceptedFiles: FileList | null,
    // eslint-disable-next-line no-unused-vars
    onChange: (value: string) => void
  ) {
    console.log(acceptedFiles);
    if (!acceptedFiles || acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    try {
      const objectUrl = URL.createObjectURL(file);
      onChange(objectUrl);
      setImage(file);
    } catch (error) {
      console.error('File type error', error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6 relative'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled
                  readOnly
                  placeholder='Enter your email address'
                  autoComplete='email'
                  className='shadow-none bg-gray-100'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='first_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>

              <FormControl>
                <div className='grid gap-2'>
                  <div className='flex items-center relative'>
                    <Input
                      autoComplete='current-password'
                      placeholder='Enter password'
                      {...field}
                      className='shadow-none'
                    />
                  </div>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='last_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>

              <FormControl>
                <div className='grid gap-2'>
                  <div className='flex items-center relative'>
                    <Input
                      autoComplete='current-password'
                      placeholder='Enter password'
                      {...field}
                      className='shadow-none'
                    />
                  </div>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='image_url'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Avatar</FormLabel>

              <FormControl>
                <div className='flex flex-col gap-5 items-center py-10 lg:items-start'>
                  <div className='flex items-center justify-center size-20 rounded-md overflow-clip border relative'>
                    {field.value && (
                      <Image
                        src={field.value}
                        fill
                        alt='User avatar'
                        className='object-cover object-center'
                      />
                    )}

                    {!field.value && (
                      <div className='flex items-center justify-center'>
                        <UserIcon className='size-5 text-gray-400' />
                      </div>
                    )}
                  </div>
                  <input
                    type='file'
                    accept='.png, .jpg, .jpeg'
                    ref={fileInputRef}
                    onChange={(e) =>
                      handleFileChange(e.target.files, field.onChange)
                    }
                    className='hidden'
                  />
                  <div className='space-y-2 flex flex-col'>
                    <Button
                      variant='outline'
                      type='button'
                      onClick={() => {
                        fileInputRef?.current?.click();
                      }}
                      className='text-xs'
                    >
                      Choose image
                    </Button>
                    {field.value && (
                      <Button
                        type='button'
                        variant='destructive'
                        onClick={() => {
                          field.onChange('');
                          setImage(undefined);
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <FormMessage className='flex items-center gap-1'>
            <Warning className='size-[1.5rem] text-destructive' />{' '}
            {form.formState.errors.root.message}
          </FormMessage>
        )}

        <div className='flex gap-2 sm:self-end'>
          <Button
            type='button'
            variant='outline'
            size='lg'
            onClick={() => form.reset()}
            className='w-full sm:w-fit'
          >
            Reset
          </Button>
          <Button
            type='submit'
            size='lg'
            disabled={form.formState.isSubmitting}
            className='bg-blue-600 hover:bg-blue-600/90 w-full sm:w-fit'
          >
            {form.formState.isSubmitting ? (
              <Spinner size='small' />
            ) : (
              'Update account'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export function ChangePassword() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const initialValues: z.infer<typeof ChangePasswordSchema> = {
    password: '',
    new_password: '',
    confirm_password: '',
  };

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof ChangePasswordSchema>) {
    const response: { success?: string; error?: string } = await changePassword(
      values
    );

    if (response?.error) {
      form.setError('root', {
        message: response.error,
      });
    }

    if (response?.success) {
      toast({
        title: 'Success',
        description: response.success,
      });
    }
  }

  const { toast } = useToast();
  const newPassword = form.watch('new_password');

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6 relative'
      >
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current password</FormLabel>
              <FormControl>
                <div className='flex items-center gap-2 relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='new-password'
                    placeholder='Enter password'
                    {...field}
                    className='pr-14'
                  />
                  <span
                    className='absolute right-3 text-sm text-gray-500'
                    onClick={() => setShowPassword((show) => !show)}
                  >
                    <Eye className='text-gray-400' />
                  </span>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='new_password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <div className='flex items-center gap-2 relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='new-password'
                    placeholder='Enter password'
                    {...field}
                    className='pr-14'
                  />
                  <span
                    className='absolute right-3 text-sm text-gray-500'
                    onClick={() => setShowPassword((show) => !show)}
                  >
                    <Eye className='text-gray-400' />
                  </span>
                </div>
              </FormControl>

              <PasswordValidation
                password={newPassword}
                errors={form.formState.errors.new_password}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirm_password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <div className='flex items-center gap-2k relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='new-password'
                    placeholder='Enter password'
                    {...field}
                    className='pr-14'
                  />
                  <span
                    className='absolute right-3 text-sm text-gray-500'
                    onClick={() => setShowPassword((show) => !show)}
                  >
                    <Eye className='text-gray-400' />
                  </span>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <FormMessage className='flex items-center gap-1'>
            <Warning className='size-[1.5rem] text-destructive' />{' '}
            {form.formState.errors.root.message}
          </FormMessage>
        )}

        <div className='flex gap-2 mt-5 sm:self-end'>
          <Button
            type='button'
            variant='outline'
            size='lg'
            onClick={() => form.reset()}
            className='w-full sm:w-fit'
          >
            Clear
          </Button>
          <Button
            type='submit'
            size='lg'
            disabled={form.formState.isSubmitting}
            className='bg-blue-600 hover:bg-blue-600/90 w-full sm:w-fit'
          >
            {form.formState.isSubmitting ? (
              <Spinner size='small' />
            ) : (
              'Change password'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
