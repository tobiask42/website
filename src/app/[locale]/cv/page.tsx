'use client';

import { useLocale } from 'next-intl';
import { useRef } from 'react';

export default function CVPage() {
  const locale = useLocale();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePrint = () => {
    iframeRef.current?.contentWindow?.focus();
    iframeRef.current?.contentWindow?.print();
  };

  return (
    <main className="bg-white">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-end">
        <button
          onClick={handlePrint}
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Drucken
        </button>
      </div>

      <iframe
        ref={iframeRef}
        src={`/cv/${locale}.html`}
        title="Curriculum Vitae"
        className="w-full border-none block"
        style={{ height: 'calc(100vh - 64px)' }}
      />
    </main>
  );
}