// src/app/[locale]/impressum/page.tsx
import { useTranslations } from 'next-intl';

export default function ImpressumPage() {
  const t = useTranslations('impressum');
  const email = process.env.NEXT_PUBLIC_EMAIL;
  const name = process.env.NEXT_PUBLIC_NAME;

  return (
    <main role="main" className="max-w-3xl mx-auto px-4 py-12 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">{t('title')}</h1>

      <p className="mb-4">{t('intro')}</p>

      <p className="mb-4">
        {t('responsible')}<br />
        {name}<br />
        E-Mail: <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a>
      </p>

      <p className="text-sm text-gray-500 mt-8">
        {t('disclaimer')}
      </p>
    </main>
  );
}
