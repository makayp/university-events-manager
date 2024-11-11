import { LoginForm } from '@/components/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your account to start creating and managing events',
};

export default function Page() {
  return <LoginForm />;
}
