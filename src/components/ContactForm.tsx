// src/components/ContactForm.tsx
'use client';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();
  const t = useTranslations('form');
  const locale = useLocale();

  useEffect(() => {
    setHydrated(true);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

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

        <form
          onSubmit={(e) => {
            const checkbox = e.currentTarget.elements.namedItem('privacy') as HTMLInputElement;
            if (!checkbox?.checked) {
              e.preventDefault();
              alert(t('privacy'));
              return;
            }
            handleSubmit(e);
          }}
          className="space-y-4"
          aria-describedby="form-status"
        >
          <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY} />

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium">
              {t('name')}
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="w-full p-3 border border-gray-300 rounded"
              autoComplete="name"
            />
          </div>


          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              {t('email')}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full p-3 border border-gray-300 rounded"
              autoComplete="email"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm font-medium">
              {t('message')}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full p-3 border border-gray-300 rounded"
            ></textarea>
          </div>

          {/* Privacy */}
          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="privacy"
              id="privacy"
              required
              aria-required="true"
              className="mt-1"
            />
            <label htmlFor="privacy">
              {t.rich?.('privacy', {
                link: (chunks) => (
                  <Link
                    href={`/${locale}/datenschutz`}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </label>
          </div>

          {/* Honeypot */}
          <div className="absolute left-[-10000px] w-px h-px overflow-hidden">
            <label htmlFor="robot-field">Leave this field empty</label>
            <input type="text" name="robot-field" id="robot-field" autoComplete="off" />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded cursor-pointer transition-colors duration-300"
          >
            {t('submit')}
          </button>

          {/* Error Message */}
          {status === 'error' && (
            <p role="alert" id="form-status" className="text-red-600">
              {t('error')}</p>
          )}
        </form>
      </div>
    </div>
  );
}
