import z from 'zod';

export const SignInSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .min(1, { message: 'Email is required' })
    .email('Please enter a valid email address.'),
  password: z.string().trim().min(1, { message: 'Password is required!' }),
});

export const SignUpSchema = z.object({
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
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[!@#$%^&*()]/,
      'Password must contain at least one special character (!@#$%^&*())'
    ),
});

export const EventFormSchema = z.object({
  event_name: z.string().trim().min(3, 'Title must be at least 3 characters'),
  description: z
    .string()
    .trim()
    .min(3, 'Description must be at least 3 characters')
    .max(400, 'Description must be less than 400 characters'),
  image_url: z.string().trim().min(1, 'Please select an image to upload'),
  location: z
    .string()
    .trim()
    .min(3, 'Location must be at least 3 characters')
    .max(400, 'Location must be less than 400 characters'),
  start_time: z.date(),
  end_time: z.date(),
  url: z.string().trim().optional(),
});
// .refine((data) => data.start_time < data.end_time, {
//   message: 'End date must be after start date',
//   path: ['endDateTime'],
// });
