import type { Metadata } from 'next';
import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import clsx from 'clsx';
import SessionProvider from '@/app/context/session-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-serif',
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

      <body
        className={clsx(
          'font-sans antialiased',
          inter.variable,
          poppins.variable
        )}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
