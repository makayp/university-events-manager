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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EventFormSchema } from '@/lib/zod';
import { Textarea } from './ui/textarea';
import ImageUploader from './image-uploader';
import { useState } from 'react';
import { CalendarIcon, LinkIcon, MapPinIcon } from '@heroicons/react/24/solid';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function EventForm({ type }: { type: string }) {
  const [image, setImage] = useState<File | null>(null);

  const initialValues = {
    title: '',
    description: '',
    imageUrl: '',
    location: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    url: '',
  };

  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: initialValues,
  });

  function onSubmit(values: z.infer<typeof EventFormSchema>) {
    console.log(values, image);
  }

  return (
    <Form {...form}>
      <form
        // id='eventForm'
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-5 relative'
      >
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input
                    placeholder='Event title'
                    {...field}
                    className='input'
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Textarea
                    placeholder='Description'
                    {...field}
                    className='textarea rounded-2xl'
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <ImageUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setImage={setImage}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex items-center  px-4 py-2 h-12 w-full bg-slate-50 rounded-2xl'>
                    <MapPinIcon className='size-5 text-secondary/80' />
                    <Input
                      placeholder='Event location or online platform'
                      {...field}
                      className='input shadow-none'
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='startDateTime'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex items-center px-4 py-2 h-12 w-full bg-slate-50 rounded-2xl'>
                    <CalendarIcon className='size-5 text-secondary/80' />

                    <p className='ml-3 whitespace-nowrap text-gray-400 text-sm'>
                      Start Date:
                    </p>
                    <DatePicker
                      name='startDateTime'
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className='bg-transparent w-fulll text-[15px]'
                      showTimeSelect
                      timeInputLabel='Time:'
                      dateFormat='MM/dd/yyyy h:mm aa'
                      wrapperClassName='datePicker'
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='endDateTime'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex items-center px-4 py-2 h-12 w-full bg-slate-50 rounded-2xl'>
                    <CalendarIcon className='size-5 text-secondary/80' />

                    <p className='ml-3 whitespace-nowrap text-gray-400 text-sm'>
                      End Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className='bg-transparent text-[15px]'
                      showTimeSelect
                      timeInputLabel='Time:'
                      dateFormat='MM/dd/yyyy h:mm aa'
                      wrapperClassName='datePicker'
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex items-center  px-4 py-2 h-12 w-full bg-slate-50 rounded-2xl'>
                    <LinkIcon className='size-5 text-secondary/80' />
                    <Input
                      placeholder='Url'
                      {...field}
                      className='input shadow-none'
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type='submit'
          size='lg'
          disabled={form.formState.isSubmitting}
          className='rounded-full h- w-fullj'
        >
          {form.formState.isSubmitting ? 'Submitting' : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
}
