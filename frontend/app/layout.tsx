import type { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';
import clsx from 'clsx';
import SessionProvider from '@/app/context/session-provider';
import AuthProvider from './context/auth-context';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'University Events Manager',
  description: 'An event manager for a university',
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
        <SessionProvider>
          <AuthProvider>{children}</AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
