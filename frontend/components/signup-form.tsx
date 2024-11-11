'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Warning from '@/public/icons/warning.svg';
import Link from 'next/link';

import { signup } from '@/lib/action';
import { SignUpSchema } from '@/lib/zod';
import { Eye } from 'lucide-react';
import { useState } from 'react';

export function SignupForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    console.log(values);
    const data = await signup(values);

    if (data?.error) form.setError('root', { message: data.error });
  }

  return (
    <Card className='mx-auto max-w-[450px] shadow-none flex flex-col'>
      <CardHeader>
        <CardTitle className='text-2xl'>Create Account</CardTitle>
        <CardDescription>
          Enter your information below to sign up.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-2 gap-2'>
              <FormField
                control={form.control}
                name='first_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter firstname' {...field} />
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
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter lastname' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      autoComplete='email'
                      placeholder='Enter your email address'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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
              name='confirm_password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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

            <Button
              type='submit'
              className='w-full bg-accent hover:bg-accent/90'
            >
              {form.formState.isSubmitting ? (
                <div
                  className='inline-block size-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-gray-100'
                  role='status'
                >
                  <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                    Loading...
                  </span>
                </div>
              ) : (
                'Create account'
              )}
            </Button>
          </form>
        </Form>

        <div className='mt-4 text-center text-sm'>
          Do you have an account?{' '}
          <Link href='/login' className='underline'>
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
