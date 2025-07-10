// Path: src/app/layout.tsx
import '@/app/globals.css';
import type { PageProps } from '@/types/layout';
import type { Metadata } from 'next';

export const metadata:Metadata = {
  title: 'Webseite von deinem Namen',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};



export default function RootLayout({ children, params }: PageProps) {
  const {locale} = params
  return (
    <html lang={locale}>
      <body className="bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
