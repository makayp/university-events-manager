import type { Metadata } from 'next';
import './globals.css';
import { Inter, Lusitana } from 'next/font/google';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const lusitana = Lusitana({
  subsets: ['latin'],
  weight: ['400', '700'],
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
          lusitana.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
