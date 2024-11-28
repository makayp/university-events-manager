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
import {
  CalendarDateRangeIcon,
  LinkIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';
import { useState } from 'react';
import ImageUploader from './image-uploader';
import { Textarea } from './ui/textarea';

import { useToast } from '@/hooks/use-toast';
import { createEvent, updateEvent } from '@/lib/action';
import { checkFileSize } from '@/lib/utils';
import Warning from '@/public/icons/warning.svg';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MAX_FILE_SIZE } from '../lib/constants';
import Spinner from './spinner';

export default function EventForm({
  type,
  event,
  eventId,
}: {
  type: 'Update' | 'Create';
  event?: z.infer<typeof EventFormSchema>;
  eventId?: string;
}) {
  const [image, setImage] = useState<File | undefined>(undefined);

  const initialValues: z.infer<typeof EventFormSchema> = {
    event_name: '',
    description: '',
    image_url: '',
    location: '',
    start_time: new Date(),
    end_time: new Date(),
    url: '',
  };

  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: event || initialValues,
  });

  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof EventFormSchema>) {
    const eventData = { ...values, image };

    if (image) {
      const fileSize = checkFileSize(image);

      if (fileSize && fileSize > MAX_FILE_SIZE) {
        form.setError('root', {
          message: 'Image must be less than 2MB',
        });
        return;
      }
    }

    let response:
      | { success?: string; error?: string; newEventId?: string }
      | undefined;

    if (type === 'Create') {
      response = await createEvent(eventData);
    }

    if (type === 'Update' && eventId) {
      response = await updateEvent(eventData, eventId);
    }

    if (response?.error) {
      form.setError('root', {
        message: response.error,
      });

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: response.error,
      });
    }

    if (response?.success) {
      toast({
        title: 'Success',
        description: response.success,
      });

      const newEventId = response?.newEventId || eventId;

      router.push(`/events/${newEventId}`);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-5 relative'
      >
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='event_name'
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
            name='image_url'
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
            name='start_time'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex items-center px-4 py-2 h-12 w-full bg-slate-50 rounded-2xl'>
                    <CalendarDateRangeIcon className='size-5 text-secondary/80' />

                    <p className='ml-3 whitespace-nowrap text-gray-400 text-sm'>
                      Start Date:
                    </p>
                    <DatePicker
                      name='start_time'
                      selected={new Date(field.value)}
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
            name='end_time'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex items-center px-4 py-2 h-12 w-full bg-slate-50 rounded-2xl'>
                    <CalendarDateRangeIcon className='size-5 text-secondary/80' />

                    <p className='ml-3 whitespace-nowrap text-gray-400 text-sm'>
                      End Date:
                    </p>
                    <DatePicker
                      selected={new Date(field.value)}
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
                      placeholder='URL'
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

        {form.formState.errors.root && (
          <FormMessage className='flex items-center gap-1'>
            <Warning className='size-[1.5rem] text-destructive' />{' '}
            {form.formState.errors.root.message}
          </FormMessage>
        )}

        <Button
          type='submit'
          size='lg'
          disabled={form.formState.isSubmitting}
          className='rounded-full'
        >
          {form.formState.isSubmitting ? (
            <Spinner size='small' />
          ) : (
            `${type} Event`
          )}
        </Button>
      </form>
    </Form>
  );
}
