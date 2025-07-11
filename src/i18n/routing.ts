// Path: src/i18n/routing.ts
import { NextRequest } from "next/server";

export const routing = {
  locales: ['en', 'de'],
  defaultLocale: 'de',

  getLocale: (request: NextRequest): string => {
    const cookieLocale = request.cookies.get('locale')?.value;

    if (cookieLocale && ['en', 'de'].includes(cookieLocale)) {
      return cookieLocale;
    }

    // rudimentärer Fallback via Header
    const acceptLang = request.headers.get('accept-language');
    return acceptLang?.startsWith('de') ? 'de' : 'en';
  }
};
