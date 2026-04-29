'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRef } from 'react';

export default function CVPage() {
    const locale = useLocale();
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const t = useTranslations('printButton');

    const handlePrint = () => {
        iframeRef.current?.contentWindow?.focus();
        iframeRef.current?.contentWindow?.print();
    };

    return (
        <main className="bg-white">
            <div className="flex justify-center py-10 bg-gray-50 border-t print:hidden">
                <button
                    onClick={handlePrint}
                    aria-label={t('ariaLabel')}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition-all font-medium"
                >
                    {/* PDF Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    {t('label')}
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