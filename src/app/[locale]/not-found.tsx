// src/app/[locale]/not-found.tsx
'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { routing } from '@/i18n/routing';

export default function NotFound() {
  const t = useTranslations('404');
  const pathname = usePathname();

  const segments = pathname.split('/');
  const locale = routing.locales.includes(segments[1]) ? segments[1] : 'en';

  return (
    <main role="main" className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">{t('title')}</h1>
      <p className="text-gray-700 mb-8">{t('description')}</p>
      <Link
        href={`/${locale}`}
        className="text-blue-600 hover:underline text-lg"
        aria-label={t('back')}
      >
        {t('back')}
      </Link>
    </main>
  );
}
