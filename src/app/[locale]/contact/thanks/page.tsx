'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function ThanksPage() {
  const t = useTranslations('thanks');

    useEffect(() => {
    document.getElementById('thankyou-heading')?.focus();
  }, []);

  return (
    <main role="main" className="min-h-screen flex items-center justify-center bg-gray-100">
      <section
        aria-labelledby="thankyou-heading"
        className="max-w-xl mx-auto p-8 text-center bg-white rounded-lg shadow-md"
      >
        <h1
          id="thankyou-heading"
          tabIndex={-1}
          className="text-3xl font-bold text-green-600 mb-4"
        >
          {t('thankyou')}
        </h1>
        <p className="text-gray-700">{t('message')}</p>
      </section>
    </main>
  );
}
