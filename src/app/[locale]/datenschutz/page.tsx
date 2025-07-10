// src/app/[locale]/datenschutz/page.tsx
import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';

export default async function DatenschutzPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">{t('title')}</h1>

      <p className="mb-4">{t('intro')}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">{t('formTitle')}</h2>
      <p className="mb-4">
        {t.rich('formText', {
          strong: (chunks) => <strong>{chunks}</strong>
        })}
      </p>

      <p className="mb-4">
        <a
          href="https://web3forms.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {t('formLinkLabel')}
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">{t('hostingTitle')}</h2>
      <p className="mb-4">
        {t.rich('hostingText', {
          strong: (chunks) => <strong>{chunks}</strong>
        })}
      </p>

      <p className="mb-4">
        <a
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {t('hostingLinkLabel')}
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">{t('nocookiesTitle')}</h2>
      <p className="mb-4">{t('nocookiesText')}</p>

      <div className="mt-8">
        <Link href={`/${locale}`} className="text-blue-600 hover:underline">
          {t('back')}
        </Link>
      </div>
    </div>
  );
}
