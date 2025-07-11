// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Link from 'next/link';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: process.env.NEXT_PUBLIC_TITLE || 'Meine Website',
    description: 'Persönliche Website',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const title = process.env.NEXT_PUBLIC_TITLE || 'Meine Website';
  const name = process.env.NEXT_PUBLIC_NAME;
  const t = (key: keyof typeof messages.base) => messages.base[key];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-blue-600 p-2 rounded"
      >
        Zum Inhalt springen
      </a>
      <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href={`/${locale}`} className="text-lg font-bold text-blue-600 hover:underline">
            {title}
          </Link>
          <nav className="text-sm text-gray-600 flex items-center">
            <LanguageSwitcher currentLocale={locale} />
          </nav>
        </div>
      </header>

      <main id="main" role="main" className="min-h-screen pt-8 bg-gray-100 text-gray-900">
        {children}
      </main>

      <footer className="bg-white text-sm text-center text-gray-500 py-6 mt-12 border-t space-y-2">
        <div className="space-x-4">
          <Link href={`/${locale}/contact`} className="hover:underline">
            {t('contact')}
          </Link>
          <Link href={`/${locale}/impressum`} className="hover:underline">
            {t('legal')}
          </Link>
          <Link href={`/${locale}/datenschutz`} className="hover:underline">
            {t('privacy')}
          </Link>
        </div>
        <div>© {new Date().getFullYear()} – {name}</div>
      </footer>
    </NextIntlClientProvider>
  );
}
