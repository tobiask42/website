import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const {
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname,
} = createNavigation(routing);

export function useCurrentLocale(): string {
  const pathname = usePathname();
  return pathname.split('/')[1] || routing.defaultLocale;
}
