import z from 'zod';

export const SignInSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .min(1, { message: 'Email is required' })
    .email('Please enter a valid email address.'),
  password: z.string().trim().min(1, { message: 'Password is required!' }),
});

export const SignUpSchema = z
  .object({
    first_name: z
      .string()
      .trim()
      .min(2, 'Firstname must be at least 2 characters.'),
    last_name: z.string().min(2, 'Lastname must be at least 2 characters.'),
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .min(1, { message: 'Email is required' })
      .email('Please enter a valid email address.'),
    password: z
      .string()
      .trim()
      .min(6, { message: 'Password must be at least 6 characters.' }),
  })
  .refine((data) => data.email.toLowerCase().endsWith('brandonu.ca'), {
    message: 'Enter your BU email address',
    path: ['email'],
  });

export const EventFormSchema = z
  .object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z
      .string()
      .min(3, 'Description must be at least 3 characters')
      .max(400, 'Description must be less than 400 characters'),
    imageUrl: z.string().min(1, 'Please select an image to upload'),
    location: z
      .string()
      .min(3, 'Location must be at least 3 characters')
      .max(400, 'Location must be less than 400 characters'),
    startDateTime: z.date(),
    endDateTime: z.date(),
    url: z.string().url(),
  })
  .refine((data) => data.startDateTime < data.endDateTime, {
    message: 'End date must be after start date',
    path: ['endDateTime'],
  });
