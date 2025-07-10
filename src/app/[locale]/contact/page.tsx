// src/app/[locale]/contact/page.tsx
import ContactForm from '@/components/ContactForm';
import { setRequestLocale } from 'next-intl/server';
import { getLocale } from 'next-intl/server';


export default async function ContactPage() {
  const locale = await getLocale();
  setRequestLocale(locale);
  return <ContactForm/>;
}
