// Path: src/app/layout.tsx
import '@/app/globals.css';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';


const title = process.env.NEXT_PUBLIC_TITLE || 'Website';
const website_description = 'Personal bilingual website for personal content and links.';


export const metadata: Metadata = {
  title: title,
  description: website_description,
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' }, // Fallback
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    shortcut: '/favicon.ico',
  }
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className="bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}


