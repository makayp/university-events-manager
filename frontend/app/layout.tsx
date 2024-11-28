import type { Metadata, Viewport } from 'next';
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
  metadataBase: new URL('https://eventhub-react.vercel.app'),
  openGraph: {
    title: 'EventHub',
    description: 'An event management web application for a university',
    url: 'https://eventhub-react.vercel.app',
    siteName: 'EventHub',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={clsx('font-sans antialiased', poppins.variable)}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
