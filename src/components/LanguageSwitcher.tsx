'use client';

import { useEffect, useState } from 'react';
import { usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import Link from 'next/link';

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const languageLabels: Record<string, string> = {
    de: currentLocale === 'de' ? 'Deutsch' : 'German',
    en: currentLocale === 'de' ? 'Englisch' : 'English',
  };

  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const segments = pathname.split('/').filter(Boolean);
  const currentIsLocale = routing.locales.includes(segments[0]);
  const pathSegments = currentIsLocale ? segments.slice(1) : segments;

  return (
    <nav aria-label="Sprachauswahl" className="ml-4 flex items-center space-x-3">
      <span aria-hidden="true">🌐</span>
      {routing.locales.map((lng) => {
        const href = '/' + [lng, ...pathSegments].join('/');
        return (
          <Link
            key={lng}
            href={href}
            className={`hover:underline ${
              lng === currentLocale ? 'font-bold text-blue-600' : 'text-gray-500'
            }`}
            aria-current={lng === currentLocale ? 'page' : undefined}
          >
            {languageLabels[lng]}
          </Link>
        );
      })}
    </nav>
  );
}
