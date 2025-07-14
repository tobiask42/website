'use client';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();
  const t = useTranslations('form');
  const locale = useLocale();

  useEffect(() => {
    setHydrated(true);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    const newErrors: Record<string, string> = {};

    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();
    const privacy = formData.get('privacy');

    if (!name) newErrors.name = t('errorName');
    if (!email || !/^[\w-.]+@[\w-.]+\.[a-z]{2,}$/i.test(email)) newErrors.email = t('errorEmail');
    if (!message) newErrors.message = t('errorMessage');
    if (!privacy) newErrors.privacy = t('privacyRequired');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('sending');

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setStatus('success');
      form.reset();
      router.push(`/${locale}/contact/thanks`);
    } else {
      setStatus('error');
    }
  }

  if (!hydrated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">{t('title')}</h1>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY} />

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium">{t('name')}</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="w-full p-3 border border-gray-300 rounded"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'error-name' : undefined}
            />
            {errors.name && <p id="error-name" className="text-red-600 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">{t('email')}</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="w-full p-3 border border-gray-300 rounded"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'error-email' : undefined}
            />
            {errors.email && <p id="error-email" className="text-red-600 text-sm">{errors.email}</p>}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm font-medium">{t('message')}</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full p-3 border border-gray-300 rounded"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'error-message' : undefined}
            />
            {errors.message && <p id="error-message" className="text-red-600 text-sm">{errors.message}</p>}
          </div>

          {/* Privacy */}
          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="privacy"
              id="privacy"
              aria-invalid={!!errors.privacy}
              aria-describedby={errors.privacy ? 'error-privacy' : undefined}
              className="mt-1"
            />
            <label htmlFor="privacy">
              {t.rich('privacy', {
                link: (chunks) => (
                  <Link href={`/${locale}/datenschutz`} target="_blank" className="text-blue-600 hover:underline">
                    {chunks}
                  </Link>
                ),
              })}
            </label>
          </div>
          {errors.privacy && <p id="error-privacy" className="text-red-600 text-sm">{errors.privacy}</p>}

          {/* Honeypot */}
          <div className="absolute left-[-10000px] w-px h-px overflow-hidden">
            <label htmlFor="robot-field">Leave this field empty</label>
            <input type="text" name="robot-field" id="robot-field" autoComplete="off" />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'sending'}
            aria-busy={status === 'sending'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded cursor-pointer transition-colors duration-300 disabled:opacity-50"
          >
            {status === 'sending' ? t('sending') : t('submit')}
          </button>

          {/* Statusmeldung */}
          {(status === 'error' || status === 'success') && (
            <p role={status === 'error' ? 'alert' : 'status'} className={`mt-2 text-sm ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
              {t(status)}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
