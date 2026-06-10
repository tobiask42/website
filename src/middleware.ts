import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false
});

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Root → Default oder Cookie
  if (pathname === '/') {
    const cookieLocale = request.cookies.get('locale')?.value;

    const locale =
      routing.locales.includes(cookieLocale || '')
        ? cookieLocale
        : routing.defaultLocale;

    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // 2. next-intl Middleware ausführen
  const response = intlMiddleware(request);

  // 3. Locale aus URL lesen
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0];

  // 4. Cookie setzen
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
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};