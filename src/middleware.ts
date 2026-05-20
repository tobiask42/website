import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Root-Path behandeln
  if (pathname === '/') {
    const cookieLocale = request.cookies.get('locale')?.value;

    let locale = cookieLocale;

    if (!locale || !routing.locales.includes(locale)) {
      const acceptLang = request.headers.get('accept-language');
      locale = acceptLang?.startsWith('de') ? 'de' : 'en';
    }

    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // 2. Standard next-intl middleware
  const response = intlMiddleware(request);

  // 3. Cookie setzen basierend auf URL
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0];

  if (routing.locales.includes(locale)) {
    response.cookies.set('locale', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|site.webmanifest).*)',
  ],
};