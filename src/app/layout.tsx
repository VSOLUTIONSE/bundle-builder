import type { Metadata } from 'next';
import DevAgentation from '@/components/DevAgentation';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bundle Builder',
  description: 'Build your custom security system bundle',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <DevAgentation />
      </body>
    </html>
  );
}
