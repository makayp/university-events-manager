'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import Link from 'next/link';
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
import { SignInSchema } from '@/lib/zod';
import { login } from '@/lib/action';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import Spinner from '../shared/spinner';
import Logo from '../header/logo';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    const error = await login(values);
    form.setError('root', { message: error });
  }

  return (
    <Card className='mx-auto max-w-[400px] shadow-none flex flex-col'>
      <CardHeader>
        <div className='space-y-10'>
          <Link href='/'>
            <Logo className='w-[7rem] md:w-[7rem]' />
          </Link>
          <CardTitle className='text-2xl'>Login</CardTitle>
        </div>
        <CardDescription>
          Enter your credentials to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your email address'
                      {...field}
                      autoComplete='email'
                    />
                  </FormControl>
                  <FormDescription>E.g email@brandonu.ca</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='grid gap-2'>
                      <div className='flex items-center'>
                        <FormLabel>Password</FormLabel>
                        {/* <Link
                          href='#'
                          className='ml-auto inline-block text-sm underline'
                        >
                          Forgot your password?
                        </Link> */}
                      </div>
                      <div className='flex items-center relative'>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          autoComplete='current-password'
                          placeholder='Enter password'
                          {...field}
                        />
                        <span
                          className='absolute right-3 text-sm text-gray-500'
                          onClick={() => setShowPassword((show) => !show)}
                        >
                          <Eye className='text-gray-400' />
                        </span>
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

            <Button
              type='submit'
              disabled={form.formState.isSubmitting}
              className='w-full bg-accent hover:bg-accent/90'
            >
              {form.formState.isSubmitting ? <Spinner size='small' /> : 'Login'}
            </Button>
          </form>
        </Form>

        <div className='mt-4 text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link href='/signup' className='underline'>
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
