'use client';

import { useLocale } from 'next-intl';

export default function CVPage() {
  const locale = useLocale();

  return (
    <main role="main" className="bg-white p-0 m-0">
      <iframe
        src={`/cv/${locale}.html`}
        title="Curriculum Vitae"
        className="w-full border-none block"
        style={{ height: 'calc(100vh - 64px)', display: 'block' }}
      />
    </main>
  );
}