// src/app/[locale]/page.tsx
import { setRequestLocale } from 'next-intl/server';
import type { PageProps } from '@/types/layout';
import NextLink from 'next/link';
import { parseLinktreeEnv } from '@/components/parser';

export default async function IndexPage(props: PageProps) {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  const linktree_heading = process.env.NEXT_PUBLIC_LINKTREE_NAME

  const linktrees = {
    de: parseLinktreeEnv(process.env.NEXT_PUBLIC_LINKTREE_DE),
    en: parseLinktreeEnv(process.env.NEXT_PUBLIC_LINKTREE_EN)
  }
  const links = linktrees[locale as 'de' | 'en'];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{linktree_heading}</h1>
        {links.map((link) => (
          <NextLink
            key={link.href}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            className="block w-full bg-white border border-gray-300 rounded-lg px-6 py-3 text-blue-600 hover:bg-blue-50 transition"
          >
            {link.label}
          </NextLink>
        ))}

      </div>
    </div>
  );
}
