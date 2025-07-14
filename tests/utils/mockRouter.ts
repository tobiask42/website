import { NextRouter } from 'next/router';

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    back: () => {},
    forward: () => {},
    push: async () => true,
    replace: async () => true,
    reload: () => {},
    prefetch: async () => {},
    beforePopState: () => {},
    isFallback: false,
    isReady: true,
    isPreview: false,
    isLocaleDomain: false,
    events: {
      on: () => {},
      off: () => {},
      emit: () => {},
    },
    locale: 'de',
    locales: ['de', 'en'],
    defaultLocale: 'de',
    ...router,
  };
}
