import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './mockRouter';
import messages from '@/messages/de.json';

export function renderWithRouter(ui: ReactNode) {
  const router = createMockRouter({ pathname: '/de/contact' });

  return render(
    <RouterContext.Provider value={router}>
      <NextIntlClientProvider locale="de" messages={messages}>
        {ui}
      </NextIntlClientProvider>
    </RouterContext.Provider>
  );
}
