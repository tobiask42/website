// Path: src/app/layout.tsx
import '@/app/globals.css';
import type { PageProps } from '@/types/layout';

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
