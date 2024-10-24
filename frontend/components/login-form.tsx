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
import { LoginFormSchema } from '@/lib/validator';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: 'jane@email.com',
      password: 'jane123',
    },
  });

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    const data = await signIn('credentials', { ...values, redirect: false });

    console.log(data);

    if (data?.error === 'Invalid credentials')
      form.setError('root.invalidCredentials', {
        message: 'Invalid credentials',
      });

    if (data?.ok && data.url) {
      const url = new URL(data.url);

      const callbackUrl = url.searchParams.get('callbackUrl') as string;

      router.replace(callbackUrl || '/');
    }
  }

  return (
    <Card className='mx-auto max-w-[400px] shadow-none flex flex-col'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
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
                    <Input placeholder='Enter your email address' {...field} />
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
                        <Link
                          href='#'
                          className='ml-auto inline-block text-sm underline'
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <Input
                        type='password'
                        placeholder='Enter password'
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root?.invalidCredentials && (
              <FormMessage className='flex items-center gap-1'>
                <Warning className='size-[1.5rem] text-destructive' />{' '}
                {form.formState.errors.root?.invalidCredentials.message}
              </FormMessage>
            )}

            <Button type='submit' className='w-full'>
              Login
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
