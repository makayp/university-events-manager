import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().trim().min(1, { message: 'Password is required!' }),
});

export const SignupFormSchema = z
  .object({
    first_name: z
      .string()
      .trim()
      .min(2, 'Firstname must be at least 2 characters.'),
    last_name: z.string().min(2, 'Lastname must be at least 2 characters.'),
    email: z.string().email('Please enter a valid email address.'),
    password: z
      .string()
      .trim()
      .min(6, { message: 'Password must be at least 6 characters.' }),
  })
  .refine((data) => data.email.toLowerCase().endsWith('brandonu.ca'), {
    message: 'Enter your BU email address',
    path: ['email'],
  });
