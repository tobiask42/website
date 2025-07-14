import { vi } from 'vitest';

export const useRouter = () => ({
  push: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn(),
  beforePopState: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isReady: true,
  isFallback: false,
  isLocaleDomain: false,
  isPreview: false,
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
});
