'use client';

import { useEffect, useState, useRef } from 'react';
import { useLocale } from 'next-intl';

export default function CVPage() {
  const locale = useLocale();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'cv-scroll') {
        setShowButton(event.data.scrollY < 50);
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const handlePrint = () => {
    iframeRef.current?.contentWindow?.print();
  };

  return (
    <main className="bg-white">
      {showButton && (
        <button
          onClick={handlePrint}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-4 py-2 rounded shadow print:hidden"
        >
          Drucken
        </button>
      )}

      <iframe
        title='Curriculum Vitae'
        ref={iframeRef}
        src={`/cv/${locale}.html`}
        className="w-full border-none block"
        style={{ height: 'calc(100vh - 64px)' }}
      />
    </main>
  );
}