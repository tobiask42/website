'use client';

import { useLocale } from 'next-intl';

export default function CVPage() {
  const locale = useLocale();

  return (
    <main role="main" className="min-h-screen bg-white">
      <iframe
        src={`/cv/${locale}.html`}
        title="Curriculum Vitae"
        className="w-full border-none"
        style={{ height: '100vh' }}
      />
    </main>
  );
}