import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './mockRouter';
import deMessages from '@/messages/de.json';

export function renderWithContext(ui: ReactNode) {
  const router = createMockRouter({ locale: 'de' });

  return render(
    <RouterContext.Provider value={router}>
      <NextIntlClientProvider locale="de" messages={deMessages}>
        {ui}
      </NextIntlClientProvider>
    </RouterContext.Provider>
  );
}
