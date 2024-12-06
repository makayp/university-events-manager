import { SignupForm } from '@/components/auth/signup-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signup',
  description: 'Create an your account to start managing events',
};

export default function Page() {
  return <SignupForm />;
}
