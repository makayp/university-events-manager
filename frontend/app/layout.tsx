import type { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';
import clsx from 'clsx';
import AuthProvider from '../context/auth-context';
import { Toaster } from '@/components/ui/toaster';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: { default: 'EventHub', template: '%s | EventHub' },
  description: 'An event management web application for a university',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      />

      <body className={clsx('font-sans antialiased', poppins.variable)}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
