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
import { SignupFormSchema } from '@/lib/validator';

export function SignupForm() {
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    console.log(values);
    form.setError('root.invalidCredentials', {
      message: 'Invalid credentials',
    });
    // console.log(form.formState.errors);
  }

  return (
    <Card className='mx-auto max-w-[500px] shadow-none flex flex-col'>
      <CardHeader>
        <CardTitle className='text-2xl font-semibold font-serif tracking-normal'>
          Create Account
        </CardTitle>
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
                name='firstName'
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
                name='lastName'
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className='grid gap-2'>
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

            <Button
              type='submit'
              className='w-full bg-primary hover:bg-primary/90'
            >
              Create account
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
